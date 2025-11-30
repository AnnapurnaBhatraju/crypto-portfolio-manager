# test_mongo.py
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# URI now uses the new, simple password 'teamcrypto2026'
# uri = "mongodb+srv://crypto_team:teamcrypto2026@cluster0.fjim537.mongodb.net/?appName=Cluster0"
uri = "mongodb+srv://crypto_manager:#crypto_team#2026@cluster0.fjim537.mongodb.net/?appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. Successfully connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")

client.close()