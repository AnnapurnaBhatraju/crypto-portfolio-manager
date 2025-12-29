from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, portfolio

app = FastAPI(title="Crypto Manager V3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crucial: This registers the logic from the auth.py file above
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])

@app.get("/")
def health():
    return {"status": "Online", "milestone": "3"}