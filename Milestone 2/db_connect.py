
import os
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, 'config.json')

def get_db_connection():
    """Initializes and returns a MongoDB client."""
    try:
        with open(CONFIG_FILE) as f:
            config = json.load(f)
        
        user = config.get("MONGO_USERNAME")
        password = config.get("MONGO_PASSWORD")
        cluster = "cluster0.fjim537.mongodb.net"
        
        uri = f"mongodb+srv://{user}:{password}@{cluster}/?appName=Cluster0"
        client = MongoClient(uri, server_api=ServerApi('1'))
        
        # Verify connection
        client.admin.command('ping')
        return client
    except Exception as e:
        print(f"CRITICAL: MongoDB Connection Failed: {e}")
        return None