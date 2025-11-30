# Progress - Shivani

## Date: 21 Nov 2025

### ✔ MongoDB Setup Completed
- Created database user and provided appropriate access.
- Added IP Access List (Current IP + Allow From Anywhere temporarily).
- Successfully connected to MongoDB using the pymongo driver.

### ✔ Password Security Setup
- Created `config.json` to securely store MongoDB username and password.
- Added `config.json` to `.gitignore` to prevent credentials from being pushed to GitHub.
- Updated `db_connect.py` to load credentials safely from JSON.

### ✔ Testing & Verification
- Executed `db_connect.py` to test MongoDB connection.
- Connection successful and sample data inserted into MongoDB cluster.

---

## Date: 30 Nov 2025

### ✔ MongoDB Users Insertion Script Completed
- Created `insert_users.py` to insert four user documents into the `users` collection.
- Used `db_connect.py` for secure MongoDB Atlas connection through credentials stored in `config.json`.
- Successfully inserted user documents for: Annapurna, Mayank, Shivani, and Chetana.
- Verified all 4 documents inside `teamcrypto_db` → `users` collection on MongoDB Atlas.

### ✔ GitHub Integration Completed
- Added and committed new files (`insert_users.py`, `db_connect.py`, `.gitignore` updates).
- Pushed changes to the `shivani` development branch.
- Created Pull Request titled **“Added MongoDB Users Insertion Script”** for review and merge.

### ✔ Testing & Validation
- Ran `python insert_users.py` to test the insertion script.
- Verified terminal output confirming successful insertion.
- Checked MongoDB Atlas and confirmed creation of database, collection, and documents.


