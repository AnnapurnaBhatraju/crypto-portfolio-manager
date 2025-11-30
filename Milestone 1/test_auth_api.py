from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from pymongo.mongo_client import MongoClient
from fastapi.middleware.cors import CORSMiddleware # Required for frontend communication

# --- Project Imports ---
# Import the database connection module created by Shivani
import sys
sys.path.append('..')
from db_connect import get_db_connection 

# --- I. JWT Configuration (Security Settings) ---
# IMPORTANT: This must be kept secret. Only use this for testing.
SECRET_KEY = "Your-Crypto-Manager-Project-Secret-Key-Annapurna-2025"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 

# Initialize FastAPI App
app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your React frontend (on port 3000) to talk to your FastAPI backend (on port 8000)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- II. Utility Functions ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Creates a JWT token containing user data and expiration time."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Token expires in 30 minutes
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_from_db(email: str) -> Optional[dict]:
    """Fetches user document from MongoDB 'users' collection."""
    try:
        client = get_db_connection()
        db = client["teamcrypto_db"]
        users_collection = db["users"]
        
        # Finds the user based on the email provided
        user_document = users_collection.find_one({"email": email})
        return user_document
        
    except Exception as e:
        print(f"MongoDB Lookup Error: {e}")
        return None

# --- III. Authentication Endpoints ---

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Handles the login request from the frontend (FE).
    The form_data contains username (email) and password.
    """
    email = form_data.username  # FE sends email as 'username'
    password = form_data.password
    
    user = get_user_from_db(email)

    # Check 1: Did we find a user?
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found in database.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check 2: Does the password match? (Simple string check for this test)
    if user.get('password') != password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # SUCCESS: Create JWT token with user data (excluding password)
    access_token = create_access_token(
        data={"sub": user['email'], "role": user['team_role']}
    )
    
    # Return the token and role to the frontend
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user_role": user['team_role']
    }

# --- IV. Secured Endpoint (Final Verification) ---

# Define the security scheme, telling FastAPI where to look for the token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user_role(token: str = Depends(oauth2_scheme)):
    """Decodes the JWT token and returns the user's role."""
    try:
        # Decode the token using the SECRET_KEY
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_role: str = payload.get("role")
        if user_role is None:
            raise HTTPException(status_code=400, detail="Role not found in token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return user_role

@app.get("/users/me/role")
def read_users_me(user_role: str = Depends(get_current_user_role)):
    """This secured endpoint confirms successful authentication and returns the user's role."""
    return {"message": "JWT Authentication Successful!", "your_role": user_role}

@app.get("/")
def read_root():
    return {"message": "FastAPI Server is Running"}