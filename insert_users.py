from db_connect import get_db_connection

# Step 1: Connect to MongoDB Atlas
client = get_db_connection()

# Step 2: Select database (use your project database)
db = client["teamcrypto_db"]

# Step 3: Select/Create 'users' collection
collection = db["users"]

# Step 4: Documents to insert
data = [
    {
        "email": "annapurna@teamcrypto.in",
        "password": "annapurna",
        "team_role": "coordinator"
    },
    {
        "email": "mayank@teamcrypto.in",
        "password": "mayank",
        "team_role": "testing"
    },
    {
        "email": "shivani@teamcrypto.in",
        "password": "shivani",
        "team_role": "risk_checker"
    },
    {
        "email": "chetana@teamcrypto.in",
        "password": "chetana",
        "team_role": "calculator"
    }
]

# Step 5: Insert documents
result = collection.insert_many(data)

print("✔️ Users inserted successfully!")
print("Inserted IDs:", result.inserted_ids)
