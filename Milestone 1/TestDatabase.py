
# import json
# from pymongo import MongoClient

# def get_db_connection():
#     # Load credentials
#     with open("config.json", "r", encoding="utf-8") as f:
#         config = json.load(f)

#     username = config["MONGO_USERNAME"]
#     password = config["MONGO_PASSWORD"]

#     connection_string = f"mongodb+srv://{username}:{password}@cluster0.fjim537.mongodb.net/?retryWrites=true&w=majority"

#     client = MongoClient(connection_string)
#     return client

import os
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# --- 1. Load Credentials Safely ---
# Define the path to your config file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, 'config.json')

# Load the sensitive credentials
try:
    with open(CONFIG_FILE) as f:
        config = json.load(f)
    
    MONGO_USER = config.get("MONGO_USERNAME")
    MONGO_PASS = config.get("MONGO_PASSWORD")
    
    # Build the full URI using the loaded user/pass
    # NOTE: You must replace 'cluster0.fjim537.mongodb.net' with your actual cluster address
    # You used this address previously: mongodb+srv://crypto_manager:#crypto_team#2026@cluster0.fjim537.mongodb.net/?appName=Cluster0
    
    CLUSTER_ADDRESS = "cluster0.fjim537.mongodb.net" 
    
    # Ensure the password special characters are URL encoded for the string
    uri = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@{CLUSTER_ADDRESS}/?appName=Cluster0"

except FileNotFoundError:
    print(f"Error: {CONFIG_FILE} not found. Cannot connect to MongoDB.")
    uri = None

# --- 2. Connection Function ---

def get_db_connection():
    """Returns a connected MongoDB client object."""
    if not uri:
        # If credentials failed to load, raise an error
        raise ConnectionError("MongoDB URI not available. Check config.json.")
        
    try:
        # Create a new client and connect to the server
        client = MongoClient(uri, server_api=ServerApi('1'))
        # Optional: Ping the server to confirm connection immediately
        client.admin.command('ping') 
        return client
        
    except Exception as e:
        print(f"MongoDB Connection Error during lookup: {e}")
        raise ConnectionError("Failed to connect to MongoDB Atlas.")

if __name__ == '__main__':
    # Test function for verification
    try:
        client = get_db_connection()
        print("Test: Connection successful!")
        client.close()
    except Exception as e:
        print(f"Test: Connection failed: {e}")