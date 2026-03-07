[Live Demo](https://crypto-portfolio-managers.onrender.com)

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

## 🟡 MILESTONE 3: Module 2 - Risk Monitoring & Alerts
The final module enables live tracking, professional file saving, and urgent risk alerts.

| Milestone 3 Requirement | Technical Implementation | Status |
| :--- | :--- | :--- |
| **Risk Checker** | Uses parallel tasks to fetch live prices and apply status badges. | **COMPLETED** |
| **Identity System** | Persistent user login/signup with hashed password security. | **COMPLETED** |
| **Predictor** | Predicts profitable mixes from historical `dataset.csv` changes. | **COMPLETED** |
| **Simple Database** | Portfolio trends and removals are synced instantly to the cloud. | **COMPLETED** |
| **File Saver** | Generates clean, text-based CSV reports for Excel compatibility. | **COMPLETED** |
| **Alert Link** | Immediate email notifications for **DANGER** zone assets. | **COMPLETED** |

### Live Risk Logic
The Risk Engine evaluates assets using a percentage-based threshold system:
* 🟢 **STABLE**: Price increase > 5% since purchase.
* 🟡 **WARNING**: Price within +/- 5% of purchase price.
* 🔴 **DANGER**: Price drop > 5% (Triggers immediate email alert).

---

## 🟣 MILESTONE 4 (Weeks 7-8): Module 3 - Rule Setter & Stress Testing (Final Release)
It introduces advanced user autonomy through dynamic rule setting ("Rule Based Mixing") and portfolio resilience testing ("Hard Situation" Simulator).

| Milestone 4 Requirement | Technical Implementation | Status |
| :--- | :--- | :--- |
| **Rule Setter Module** |	Created a dynamic constraint engine allowing users to mix Fixed Amounts ($) and Percentages (%) simultaneously.	| **COMPLETED** |
| **"Hard Situation" Tester** |	Implemented StrategyMixer.js to simulate different market conditions (Safe, Balanced, Risk) and adjust weights automatically.	| **COMPLETED** |
| **Constraint Logic** |	Algorithm processes fixed dollar allocations first, then distributes remaining capital proportionally based on percentage rules.	| **COMPLETED** |
| **Conflict Resolution** |	Built-in validation prevents over-allocation (>100% budget) and guides the user to use "Remaining" logic.	| **COMPLETED** |
| **Final UI Polish** |	Unified the entire application under the "Royal Blue & Gold" theme with responsive layouts and sticky footers.	| **COMPLETED** |

**🧠 Core Logic: The Rule Engine**
The Rule-Based Mixer uses a Constraint Satisfaction Algorithm to generate portfolios:

- **Priority 1 (Fixed Constraints)**: All rules defining a specific dollar amount (e.g., "$2000 in ETH") are deducted from the Total Budget first.
- **Priority 2 (Percentage Constraints)**: Remaining budget is calculated. Specific percentage rules (e.g., "50% BTC") are applied to the remaining amount (or total, depending on user configuration).
- **Priority 3 (The "Remaining" Bucket)**: Any capital left over after Priority 1 & 2 is swept into the specific asset defined as "Remaining" (e.g., USDT) to ensure 0% wasted capital.

**🛡️ Core Logic: Stress Testing (Strategy Mixer)**
The system allows users to rebalance their existing portfolio based on market volatility predictions:

* 🛡️ **SAFE Mode**: Prioritizes Stablecoins (50%) and King Assets (BTC 25%) to preserve capital during crashes.
* ⚖️ **BALANCED Mode**: Shifts focus to Core L1s (ETH, SOL 40%) and BTC (30%) for steady growth.
* 🚀 **RISK Mode**: allocate heavily into High-Beta Alts (60%) and Core L1s (25%) for maximum aggressive growth during bull runs.

---

### Project Documentation
* [Google Drive Documentation (Team Log)](https://drive.google.com/drive/folders/1_WbgdxV89VtGe2Fkis5hRO7FPAJBTwbS)

---

