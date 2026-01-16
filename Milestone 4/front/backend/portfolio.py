from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List
import os

# --- IMPORTS ---
from db_connect import get_db_connection
from risk_engine import generate_risk_badge
from gecko_service import get_live_prices
from reporting import generate_csv_report, send_danger_alert
from ms2_engine.engine import calculate_log_returns, find_max_sharpe_weights

from fastapi.responses import FileResponse
from datetime import datetime

router = APIRouter()
db = get_db_connection()["teamcrypto_db"]

# --- Models ---
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
        if risk['status'] == "DANGER":
            background_tasks.add_task(send_danger_alert, email, h['coin'])
        enriched.append({**h, "live_price": live_price, **risk})
    return {"holdings": enriched}

@router.get("/download-report/{email}")
async def download_report(email: str):
    data = db.user_portfolios.find_one({"user_email": email})
    if not data: raise HTTPException(status_code=404, detail="No portfolio found")
    
    holdings = data.get("holdings", [])
    if not holdings:
        raise HTTPException(status_code=400, detail="Portfolio is empty.")

    coins = [h['coin'] for h in holdings]
    live_prices = get_live_prices(coins)
    
    report_data = []
    for h in holdings:
        coin_key = h['coin'].lower().replace(" ", "-")
        live_price = live_prices.get(coin_key, {}).get('usd', 0)
        risk = generate_risk_badge(float(h['purchase_price']), live_price)
        report_data.append({
            "coin": h['coin'],
            "amount": h['amount'],
            "live_price": live_price,
            "status": risk['status']
        })
    
    # Correct order: email first, data second
    filepath = generate_csv_report(email, report_data)
    
    if not filepath or not os.path.exists(filepath):
        raise HTTPException(status_code=500, detail="Failed to create CSV.")

    return FileResponse(filepath, media_type='text/csv', filename="CryptoManager_Report.csv")

@router.post("/suggest-rebalance")
async def suggest_rebalance(req: SuggestionRequest):
    try:
        csv_path = os.path.join("ms2_engine", "dataset.csv")
        log_returns, available_coins = calculate_log_returns(csv_path)
        
        valid_coins = []
        for user_coin in req.selected_coins:
            for csv_coin in available_coins:
                if user_coin.lower() == csv_coin.lower():
                    valid_coins.append(csv_coin) 
                    break
        
        if len(valid_coins) < 2:
            raise HTTPException(status_code=400, detail=f"Need at least 2 valid coins. Found: {valid_coins}")
            
        ai_result = find_max_sharpe_weights(valid_coins, log_returns)
        return {"suggested_mix": ai_result["optimal_weights"], "max_sharpe": ai_result.get("max_sharpe_ratio", 0)}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/finalize")
async def finalize_portfolio(req: FinalizeRequest):
    """
    FIX: This now OVERWRITES the portfolio instead of merging.
    Only the coins from the current selection will be saved.
    """
    try:
        # Convert request models to list of dictionaries
        new_holdings_list = [item.dict() for item in req.holdings]
        
        # UPDATE with $set will REPLACE the entire 'holdings' array
        db.user_portfolios.update_one(
            {"user_email": req.email}, 
            {"$set": {"holdings": new_holdings_list, "last_updated": datetime.utcnow()}}, 
            upsert=True
        )
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/remove/{email}/{coin}")
async def remove_coin(email: str, coin: str):
    db.user_portfolios.update_one({"user_email": email}, {"$pull": {"holdings": {"coin": coin}}})
    return {"message": "Deleted"}