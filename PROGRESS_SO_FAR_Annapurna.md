# Crypto-Portfolio Manager Project Progress Log

# Team Lead Progress - Annapurna Bhatraju

## Date: 20 Nov 2025

### ✔ Frontend Environment Setup
- Successfully installed Node.js and verified the base React application setup.
- Established primary feature branch (`annapurna`) for secure testing and created branches for team mates for their work commits .
- Determined the core technical stack (React.js, FastAPI, MongoDB Atlas, JWT) based on mentor mandates.

---

## Date: 29 Nov 2025

### ✔ Milestone 1 Learning & Verification Checks
- Successfully conducted and synthesized team presentations on **Parallel Ways** (Threading/Multiprocessing), **Sharpe Ratio** (Math), and the **Mixed Data Strategy**.
- Confirmed the use of the **Cryptocurrency Prices Data** (Kaggle) and **CoinGecko API** for the project scope.
---

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
---
## Date: 20 Dec 2025 – 23 Dec 2025

### ✔ Milestone 2: Core Optimization Engine & Investment Logic
- **Data Transformation Layer:** Developed a robust logic in `engine.py` to pivot "long-format" CSV data (crypto names in rows) into a "wide-format" matrix (coins as columns) for mathematical processing.
- **Parallel Monte Carlo Simulation:** Implemented an optimization engine that runs **10,000 simulations** using Python’s **`multiprocessing.Pool`** to determine the optimal asset weights nearly instantaneously.
- **Financial Math Integration:** Integrated the **Sharpe Ratio** formula to identify the portfolio mix with the highest risk-adjusted return.

### ✔ Full Stack Feature: Profitable Mix Suggested
- **Backend (FastAPI):** Created the `/api/v1/optimize` endpoint to accept user budgets and selected assets. Added logic to handle `NaN` and `Infinity` float values to ensure JSON compliance.
- **Database Persistence:** Updated MongoDB logic to save detailed session history, including the specific **dollar-amount distribution** for chosen coins (e.g., "$1000 budget -> $600 Bitcoin / $400 Litecoin").
- **Frontend (React):** Built a high-performance **Asset Selection UI** featuring a scrollable grid containing all **56 unique crypto assets** extracted from the dataset.

### ✔ Debugging & Repository Hygiene
- **Bug Fix:** Resolved the `NotImplementedError` regarding PyMongo database truth-value testing by implementing explicit `is not None` checks.
- **Data Cleaning:** Implemented `ffill()` and `bfill()` methods to handle missing values in historical price data, ensuring simulation accuracy.
- **Final Packaging:** Bundled all Milestone 2 components into a clean folder structure and updated `README.md` with technical architecture and mathematical proofs.
