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

## 🔵 MILESTONE 2: Module 1 - Investment Mix Calculator
Milestone 2 successfully implemented the core mathematical and concurrency engine. The system can now suggest a "Profitable Mix" based on historical risk/return analysis.

| Milestone 2 Requirement | Technical Implementation | Status |
| :--- | :--- | :--- |
| **Log Returns Calculation** | Implemented log-normal return processing using NumPy and Pandas. | **COMPLETED** |
| **Monte Carlo Engine** | Built a parallelized engine running 10,000 simulations per request. | **COMPLETED** |
| **Multiprocessing** | Optimized performance using Python's `Pool` to utilize multi-core CPUs. | **COMPLETED** |
| **Investment Strategy UI** | New React interface for budget input and selection of 56+ unique assets. | **COMPLETED** |
| **Data Persistence** | Detailed profitable mixes and Sharpe ratios saved to MongoDB history. | **COMPLETED** |

### Key Optimization Logic: The Sharpe Ratio
The system calculates the **Sharpe Ratio** for every simulated portfolio:
$$Sharpe Ratio = \frac{R_p - R_f}{\sigma_p}$$
Where $R_p$ is portfolio return, $R_f$ is risk-free rate, and $\sigma_p$ is portfolio volatility. The engine selects the weights that maximize this value.

---

## Next Focus
We are proceeding to **Milestone 3 (Module 2: Risk Monitoring & Alerts)** to integrate live API feeds for real-time tracking.
### Project Documentation
* [Google Drive Documentation (Team Log)](https://drive.google.com/drive/folders/1_WbgdxV89VtGe2Fkis5hRO7FPAJBTwbS)

---
