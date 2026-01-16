#  python -m uvicorn main_api:app --reload
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import os

# Import your modules
from db_connect import get_db_connection
from live_prices import get_live_prices
from ms2_engine.engine import calculate_log_returns, find_max_sharpe_weights

from portfolio import router as portfolio_router

app = FastAPI()

# Allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], # Allow React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio_router, prefix="/api/portfolio")

# Connect to DB
client = get_db_connection()
db = client["teamcrypto_db"] if client else None

# --- Data Models ---
class LoginRequest(BaseModel):
    email: str
    password: str

class OptimizationRequest(BaseModel):
    user_email: str
    selected_coins: List[str]
    total_investment: float

# --- Endpoints ---

@app.get("/")
def root():
    return {"status": "Online", "message": "Backend is running!"}

@app.post("/login")
def login(request: LoginRequest):
    if db is None: raise HTTPException(status_code=500, detail="Database Offline")
    
    user = db.users.find_one({"email": request.email})
    
    if user and user["password"] == request.password:
        # --- FIX APPLIED HERE ---
        # We use .get() so it doesn't crash if the key is missing or named differently
        user_role = user.get("team_role") or user.get("role") or "user"
        
        return {"email": user["email"], "role": user_role}
        
    raise HTTPException(status_code=401, detail="Invalid Credentials")

@app.get("/monitor/live-prices")
def monitor(coins: str):
    # Example input: coins="bitcoin,ethereum"
    return get_live_prices(coins.split(','))

@app.post("/api/v1/optimize")
def optimize(request: OptimizationRequest):
    # 1. Locate Data
    csv_path = os.path.join("ms2_engine", "dataset.csv")
    
    # 2. Process Data
    log_returns, available_coins = calculate_log_returns(csv_path)
    if log_returns is None:
        raise HTTPException(status_code=500, detail="Could not read dataset.csv")

    # 3. Run Math
    result = find_max_sharpe_weights(request.selected_coins, log_returns)
    
    # 4. Save to MongoDB
    if db is not None:
        db.portfolio_history.insert_one({
            "email": request.user_email,
            "investment": request.total_investment,
            "result": result,
            "timestamp": datetime.utcnow()
        })
        
    return {"suggested_mix": result["optimal_weights"], "sharpe": result["max_sharpe_ratio"]}