# Progress - MAYANK 
## DATE : 01 DEC 2025
## ✔ Basic React Login Frontend Setup 

✔ Project Initialization
- Created a new React project using Create React App.
- Set up project structure with components, App, and basic styles.

✔ Login UI Setup
- Added a simple login form with username and password fields.
- Included labels, placeholders, and basic input styling.
- Added a submit button with form handling structure.

✔ State Management
- Implemented React useState hooks to store username and password values.
- Added input event handlers to keep form data updated.
- Prepared form submission handler for backend integration.

✔ Ready for Backend Integration
The login form is now ready to connect with:
- REST API authentication endpoint
- JWT login
- Any backend login system

<hr>

## DATE : 22 DEC 2025
## ✔ React Crypto Portfolio Optimizer Setup

✔ Project Integration & Libraries
- Installed and configured recharts for data visualization.
- Integrated react-select for handling multi-asset cryptocurrency selection.
- Implemented react-currency-input-field for professional financial input formatting.

✔ UI Design & Theming
- Designed a professional "Emerald Green" and Mint theme using CSS-in-JS.
- Customized the internal styles of the React-Select component to match the green theme.
- Created a responsive card layout with professional box shadows and hover animations.

✔ Logic & State Management
- Implemented useState to handle investment amounts and selected assets.
- Developed a "Penny Perfect" distribution algorithm to ensure total allocation matches the input exactly without statistical rounding errors.
- Added input validation to prevent calculation errors on empty fields.

✔ Data Visualization
- Rendered an interactive Pie Chart to visualize the percentage split.
- Created a dynamic "Exact Distribution" list to display the precise dollar value per coin.
- Added customized tooltips and legends for a better user experience.

<hr>

## DATE : 26 DEC 2025
## ✔ Backend Crypto Calculator Architecture Setup

✔ Project Structure & Core Dependencies
- Configured Node.js backend with modular service based architecture.
- Integrated Express for API routing and middleware handling.
- Installed Axios for external crypto market API consumption.
- Configured dotenv for secure environment variable management.

✔ Database Design & Integration
- Designed normalized database schema for Bitcoin historical price data.
- Integrated PostgreSQL using Prisma ORM for type safe queries.
- Implemented indexed timestamp based queries for fast historical lookups.
- Added fallback logic to detect missing data ranges in the database.

✔ Bitcoin Data Validation Layer
- Built data consistency checks between stored BTC prices and live API values.
- Implemented timestamp reconciliation to prevent stale or duplicate entries.
- Added sanity thresholds to reject abnormal price spikes or malformed API responses.

✔ API Decision Engine
- Created a decision layer that dynamically chooses between database data or live API calls.
- Prioritized database reads for historical calculations to reduce API costs.
- Triggered external API calls only when database data is outdated or incomplete.
- Logged API decisions for monitoring and optimization insights.

<hr>

## DATE : 31 DEC 2025
## ✔ Milestone 4: Spreading Rule Setter & Stress Testing UI

### ✔ Spreading Rule Interface ("AI Strategy Mixer")
- **Developed StrategyMixer.js Component:**
  - Created a dedicated interface for setting rebalancing rules.
  - Implemented a **Risk Appetite Slider** (0-100) that abstracts complex math into a simple user control.
  - Added CSS styling for a "Financial Terminal" look (Dark mode, gradients).

### ✔ Dynamic Data & Automation Logic
- **Dynamic Asset Loading:**
  - Updated the component to fetch the user's previously selected assets (e.g., BTC, ETH, SOL) from the database/state instead of hardcoding them.
  - Implemented `useEffect` to handle the asynchronous loading state.
- **Auto-Calculation Algorithm:**
  - Wrote logic to automatically calculate the split between **Stablecoins (Safety)** and **Volatile Assets (Risk)** based on the slider input.
  - Visualized these calculations instantly using dynamic progress bars.

### ✔ Stress Testing & Dynamic Feedback
- **Scenario Simulation UI:**
  - Added controls to test "Hard Situations" (e.g., "Simulate Market Crash" / "Bull Run").
  - Created visual alert systems (`rebalanceTrigger`) to show users exactly when a rule would trigger a Buy/Sell action.
- **Visual Tolerance Markers:**
  - Implemented CSS markers on asset bars to visually indicate the "Safe Zone" vs. "Rebalance Zone."





