
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import os

from db_connect import get_db_connection
from ms2_engine.engine import calculate_log_returns, find_max_sharpe_weights

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = get_db_connection()
# Explicit check 'is not None' for compatibility with latest PyMongo
db = client["teamcrypto_db"] if client is not None else None

class LoginRequest(BaseModel):
    email: str
    password: str

class OptimizationRequest(BaseModel):
    user_email: str
    selected_coins: List[str]
    total_investment: float

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

@app.post("/api/v1/optimize")
def optimize(request: OptimizationRequest):
    try:
        path = os.path.join("ms2_engine", "dataset.csv")
        log_returns, available = calculate_log_returns(path)
        
        # Run Mathematical Engine
        result = find_max_sharpe_weights(request.selected_coins, log_returns)
        
        # Calculate specific Profitable Mix Suggested
        profitable_mix = {}
        for coin, weight in result["optimal_weights"].items():
            profitable_mix[coin] = {
                "percentage": f"{weight * 100:.2f}%",
                "recommended_investment": round(weight * request.total_investment, 2)
            }

        # Save exact session data to MongoDB
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