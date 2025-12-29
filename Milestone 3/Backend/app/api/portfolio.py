
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from db_connect import get_db_connection
from app.services.risk_engine import generate_risk_badge
from app.services.gecko_service import get_live_prices
from app.services.reporting import generate_csv_report, send_danger_alert
from fastapi.responses import FileResponse
from datetime import datetime
from typing import List
import os

router = APIRouter()
db = get_db_connection()["crypto_v3_db"]

# --- Request Models ---
class HoldingItem(BaseModel):
    coin: str
    amount: float
    purchase_price: float

class FinalizeRequest(BaseModel):
    email: str
    holdings: List[HoldingItem]

class SuggestionRequest(BaseModel):
    email: str
    selected_coins: List[str]
    total_budget: float

# --- Routes ---

@router.get("/view/{email}")
async def view_portfolio(email: str, background_tasks: BackgroundTasks):
    """
    Identity System & Risk Checker: Fetches live trends and triggers alerts. 
    Emails are ONLY sent when viewing this dashboard monitor.
    """
    data = db.user_portfolios.find_one({"user_email": email})
    if not data: return {"holdings": []}
    
    holdings = data.get("holdings", [])
    coins = [h['coin'] for h in holdings]
    live_prices = get_live_prices(coins) 
    
    enriched = []
    for h in holdings:
        coin_key = h['coin'].lower().replace(" ", "-")
        live_price = live_prices.get(coin_key, {}).get('usd', 0)
        risk = generate_risk_badge(float(h['purchase_price']), live_price)
        
        # Immediate Alert Trigger (Alert Link)
        if risk['status'] == "DANGER":
            background_tasks.add_task(send_danger_alert, email, h['coin'])
            
        enriched.append({**h, "live_price": live_price, **risk})
    return {"holdings": enriched}

@router.get("/download-report/{email}")
async def download_report(email: str):
    """
    File Saver: Generates a CSV without re-triggering duplicate email alerts.
    """
    data = db.user_portfolios.find_one({"user_email": email})
    if not data:
        raise HTTPException(status_code=404, detail="No portfolio found")
    
    holdings = data.get("holdings", [])
    coins = [h['coin'] for h in holdings]
    live_prices = get_live_prices(coins)
    
    report_data = []
    for h in holdings:
        coin_key = h['coin'].lower().replace(" ", "-")
        live_price = live_prices.get(coin_key, {}).get('usd', 0)
        risk = generate_risk_badge(float(h['purchase_price']), live_price)
        
        # Text-only enrichment to avoid emoji encoding issues in Excel
        report_data.append({
            "coin": h['coin'],
            "amount": h['amount'],
            "live_price": live_price,
            "status": risk['status']
        })
        
    filepath = generate_csv_report(email, report_data)
    return FileResponse(filepath, media_type='text/csv', filename="CryptoManager_Report.csv")

@router.post("/suggest-rebalance")
async def suggest_rebalance(req: SuggestionRequest):
    """Predictor: Calculates profitable mixes using engine.py and dataset.csv."""
    try:
        from app.core.engine import calculate_log_returns, find_max_sharpe_weights
        dataset_path = os.path.join(os.path.dirname(__file__), "..", "core", "dataset.csv")
        log_returns, _ = calculate_log_returns(dataset_path)
        available_in_csv = log_returns.columns.tolist()
        valid_coins = [c.capitalize() for c in req.selected_coins if c.capitalize() in available_in_csv]
        
        if len(valid_coins) < 2:
            raise HTTPException(status_code=400, detail="Dataset needs at least 2 valid coins.")
            
        ai_result = find_max_sharpe_weights(valid_coins, log_returns)
        return {"suggested_mix": ai_result["optimal_weights"], "max_sharpe": ai_result.get("max_sharpe_ratio", 0)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/finalize")
async def finalize_portfolio(req: FinalizeRequest):
    """Simple Database: Saves trends in the persistent MongoDB Atlas database."""
    try:
        existing = db.user_portfolios.find_one({"user_email": req.email})
        current_holdings = existing.get("holdings", []) if existing else []
        new_data = {item.coin: item for item in req.holdings}
        updated_holdings = []
        seen_coins = set()
        
        for h in current_holdings:
            if h['coin'] in new_data: 
                h['amount'] += new_data[h['coin']].amount
            updated_holdings.append(h)
            seen_coins.add(h['coin'])
            
        for coin, item in new_data.items():
            if coin not in seen_coins: 
                updated_holdings.append(item.dict())
                
        db.user_portfolios.update_one(
            {"user_email": req.email}, 
            {"$set": {"holdings": updated_holdings, "last_updated": datetime.utcnow()}}, 
            upsert=True
        )
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/remove/{email}/{coin}")
async def remove_coin(email: str, coin: str):
    """Deletes an asset and syncs with MongoDB."""
    db.user_portfolios.update_one({"user_email": email}, {"$pull": {"holdings": {"coin": coin}}})
    return {"message": "Deleted"}