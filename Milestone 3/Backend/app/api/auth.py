from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db_connect import get_db_connection
from app.core.security import hash_password, verify_password
from datetime import datetime

router = APIRouter()
db = get_db_connection()["crypto_v3_db"]

class AuthRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user: AuthRequest):
    # Check if user already exists
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Account already exists")
    
    new_user = {
        "email": user.email,
        "password": hash_password(user.password),
        "created_at": datetime.utcnow()
    }
    db.users.insert_one(new_user)
    return {"message": "✅ Account created successfully! Please log in."}

@router.post("/login")
async def login(user: AuthRequest):
    # Find user in MongoDB
    stored_user = db.users.find_one({"email": user.email})
    
    if not stored_user or not verify_password(user.password, stored_user["password"]):
        raise HTTPException(status_code=401, detail="❌ Invalid email or password")
    
    return {"user_email": user.email}