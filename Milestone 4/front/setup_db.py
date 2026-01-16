# run database
from db_connect import get_db_connection

def init_db():
    client = get_db_connection()
    if not client: return

    db = client["teamcrypto_db"]
    collection = db["users"]
    
    users = [
        {"email": "annapurnabhatraju2005@gmail.com", "password": "annapurna", "role": "coordinator"},
        {"email": "123razz321@gmail.com", "password": "mayank", "role": "testing"},
        {"email": "shivanibaravkar2@gmail.com", "password": "shivani", "role": "risk_checker"},
        {"email": "chetana.kovi05@gmail.com", "password": "chetana", "role": "calculator"}
    ]
    
    # Test connection and insert
    try:
        client.admin.command('ping')
        collection.delete_many({})
        collection.insert_many(users)
        print("✅ Database Connected & Users Created Successfully!")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    init_db()