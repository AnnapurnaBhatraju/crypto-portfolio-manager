import json
from pymongo import MongoClient

def get_db_connection():
    # Load credentials
    with open("config.json", "r", encoding="utf-8") as f:
        config = json.load(f)

    username = config["MONGO_USERNAME"]
    password = config["MONGO_PASSWORD"]

    connection_string = f"mongodb+srv://{username}:{password}@cluster0.fjim537.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(connection_string)
    return client
