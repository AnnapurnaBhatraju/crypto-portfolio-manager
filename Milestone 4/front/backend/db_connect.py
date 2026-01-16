import os
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, 'config.json')

def get_db_connection():
    if not os.path.exists(CONFIG_FILE):
        print("❌ Config file missing.")
        return None

    try:
        with open(CONFIG_FILE) as f:
            config = json.load(f)
        
        user = config.get("MONGO_USERNAME")
        password = config.get("MONGO_PASSWORD")
        cluster = config.get("MONGO_CLUSTER")
        
        uri = f"mongodb+srv://{user}:{password}@{cluster}/?appName=Cluster0"
        
        client = MongoClient(uri, server_api=ServerApi('1'), serverSelectionTimeoutMS=5000)
        return client

    except Exception as e:
        print(f"❌ Connection Failed: {e}")
        return None