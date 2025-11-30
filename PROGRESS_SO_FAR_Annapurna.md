# Crypto-Portfolio Manager Project Progress Log

# Team Lead Progress - Annapurna Bhatraju

## Date: 20 Nov 2025

### ✔ Frontend Environment Setup
- Successfully installed Node.js and verified the base React application setup.
- Established primary feature branch (`annapurna`) for secure testing and created branches for team mates for their work commits .
- Determined the core technical stack (React.js, FastAPI, MongoDB Atlas, JWT) based on mentor mandates.

## Date: 29 Nov 2025

### ✔ Milestone 1 Learning & Verification Checks
- Successfully conducted and synthesized team presentations on **Parallel Ways** (Threading/Multiprocessing), **Sharpe Ratio** (Math), and the **Mixed Data Strategy**.
- Confirmed the use of the **Cryptocurrency Prices Data** (Kaggle) and **CoinGecko API** for the project scope.

## Date: 30 Nov 2025

### ✔ Full Integration Test (JWT Security Pipeline)
- **Git Integration:** Merged code from `shivani` and `mayank` branches into local `annapurna` branch for testing.
- **Backend Setup:** Created the FastAPI JWT test structure (`test_auth_api.py`) and installed all necessary security libraries (`python-jose`, `passlib`).
- **Data Path Fix:** Identified and manually corrected the missing `config.json` credentials, ensuring secure database access.

### ✔ End-to-End Authentication Verified
- Ran the full pipeline (React Login Page -> FastAPI/JWT -> MongoDB Lookup).
- **Result:** Successfully logged in using team credentials and retrieved the correct **`team_role`** (`coordinator`), proving the entire security pipeline is functional and ready for Milestone 2.

### ✔ Repository Finalization
- **Action:** Deleted all temporary, insecure test scripts (`m1_integration_test/`, `m1_insert_users.py`, `test_coin_gecko.py`) to maintain repository hygiene.
- **Next Step:** Ready to merge final, clean code into the `main` branch.