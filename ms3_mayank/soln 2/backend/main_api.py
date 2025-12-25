# updated main_api.py to include live monitoring and update/delete functionality


# File: Backend/main_api.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId # Required to handle MongoDB IDs
import os

from db_connect import get_db_connection
from ms2_engine.engine import calculate_log_returns, find_max_sharpe_weights
from live_prices import get_live_prices # Importing Mayank's new script

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = get_db_connection()
db = client["teamcrypto_db"] if client is not None else None

# --- Models ---
class LoginRequest(BaseModel):
    email: str
    password: str

class OptimizationRequest(BaseModel):
    user_email: str
    selected_coins: List[str]
    total_investment: float

class UpdatePortfolioRequest(BaseModel):
    # For updating investment amount
    new_total_investment: float

# --- Helper Function ---
def fix_mongo_id(document):
    """Converts MongoDB '_id' object to a string so frontend can read it."""
    document["id"] = str(document["_id"])
    del document["_id"]
    return document

# --- API Endpoints ---

@app.get("/")
def root():
    return {"status": "Online", "message": "API Ready"}

@app.post("/login")
def login(request: LoginRequest):
    if db is None: raise HTTPException(status_code=500, detail="Database Error")
    user = db.users.find_one({"email": request.email})
    if user and user["password"] == request.password:
        return {"email": request.email}
    raise HTTPException(status_code=401, detail="Unauthorized")

# === TASK 1: LIVE MONITORING ===
@app.get("/monitor/live-prices")
def monitor_assets(coins: str):
    """
    Receives a comma-separated string of coins (e.g., "bitcoin,ethereum")
    Returns current prices from CoinGecko.
    """
    coin_list = coins.split(',')
    prices = get_live_prices(coin_list)
    return prices

# === TASK 2: UPDATE & DELETE ===

@app.get("/portfolio/{user_email}")
def get_user_history(user_email: str):
    """Fetches all saved portfolios for a user."""
    if db is None: raise HTTPException(status_code=500, detail="Database Error")
    
    # Find all documents for this user
    history = list(db.portfolio_history.find({"user_email": user_email}))
    
    # Clean up IDs for JSON response
    return [fix_mongo_id(doc) for doc in history]

@app.put("/portfolio/{entry_id}")
def update_portfolio(entry_id: str, request: UpdatePortfolioRequest):
    """Updates the total investment amount for a specific saved portfolio."""
    if db is None: raise HTTPException(status_code=500, detail="Database Error")

    try:
        # Update the 'total_budget' field in MongoDB
        result = db.portfolio_history.update_one(
            {"_id": ObjectId(entry_id)}, 
            {"$set": {"total_budget": request.new_total_investment}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio entry not found")
            
        return {"message": "Update Successful", "new_amount": request.new_total_investment}
        
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")

@app.delete("/portfolio/{entry_id}")
def delete_portfolio(entry_id: str):
    """Permanently deletes a portfolio entry from MongoDB."""
    if db is None: raise HTTPException(status_code=500, detail="Database Error")

    try:
        # Delete the document with the matching ID
        result = db.portfolio_history.delete_one({"_id": ObjectId(entry_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio entry not found")
            
        return {"message": "Deleted Successfully"}
        
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")

# === EXISTING OPTIMIZATION ENDPOINT ===
@app.post("/api/v1/optimize")
def optimize(request: OptimizationRequest):
    try:
        path = os.path.join("ms2_engine", "dataset.csv")
        log_returns, available = calculate_log_returns(path)
        
        # Run Mathematical Engine
        result = find_max_sharpe_weights(request.selected_coins, log_returns)
        
        profitable_mix = {}
        for coin, weight in result["optimal_weights"].items():
            profitable_mix[coin] = {
                "percentage": f"{weight * 100:.2f}%",
                "recommended_investment": round(weight * request.total_investment, 2)
            }

        # Save to MongoDB
        if db is not None:
            db.portfolio_history.insert_one({
                "user_email": request.user_email,
                "timestamp": datetime.utcnow(),
                "total_budget": request.total_investment,
                "selected_coins": request.selected_coins,
                "profitable_mix_suggested": profitable_mix,
                "max_sharpe": round(result["max_sharpe_ratio"], 4)
            })
        
        return {
            "max_sharpe_ratio": result["max_sharpe_ratio"],
            "suggested_mix": profitable_mix
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main_api:app", host="127.0.0.1", port=8000, reload=True)