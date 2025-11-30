# crypto-portfolio-manager

### Infosys Springboard 6.0 | Python Crypto Investment Manager Project

This repository hosts the source code for the Crypto Portfolio Manager, a system designed to calculate optimal crypto asset mixes and perform risk monitoring.

---

## Project Architecture

The system is built using a **Decoupled Two-Tier Architecture**, ensuring the front-end and back-end are independent and communicate securely via API calls.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend API** | Python (FastAPI) | Handles all data processing, calculations, and MongoDB interactions. |
| **Database** | MongoDB Atlas | Stores user authentication and future risk trend data. |
| **Frontend UI** | React.js | Provides the user interface for input and display. |
| **Security** | JWT (JSON Web Tokens) | Secures the data pipeline between the Frontend and Backend API. |

---

## 🟢 MILESTONE 1 (Week 1 & 2): Setup and Verification Summary

Milestone 1 successfully established the project environment and verified all core technology integrations.

| Milestone 1 Requirement | Technical Implementation | Status |
| :--- | :--- | :--- |
| **Prepare Python with database** | MongoDB Atlas connection verified and test user schema inserted. | **COMPLETED** |
| **Teach parallel ways & math** | Theoretical foundation established: **Sharpe Ratio** (Math) and **Threading/Multiprocessing** (Concurrency). | **COMPLETED** |
| **Plan crypto types** | Data Strategy defined: Uses historical data (Kaggle) for analysis and real-time data (CoinGecko API) for monitoring. | **COMPLETED** |
| **End-to-End Integration** | Full authentication pipeline (React Login $\rightarrow$ JWT $\rightarrow$ MongoDB) successfully tested and verified. | **COMPLETED** |

### Project Documentation
* [Google Drive Documentation (Team Log)](https://drive.google.com/drive/folders/1_WbgdxV89VtGe2Fkis5hRO7FPAJBTwbS)

---

## Next Focus

We are proceeding to **Milestone 2 (Module 1: Investment Mix Calculator)** to build the core optimization logic.
