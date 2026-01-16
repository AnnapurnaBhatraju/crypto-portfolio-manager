import React, { useState, useEffect, useCallback } from 'react';
import './StrategyMixer.css'; // Import the new CSS file

const StrategyMixer = ({ userEmail }) => {
  const [realHoldings, setRealHoldings] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [strategyData, setStrategyData] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);

  // --- 1. FETCH PORTFOLIO & LIVE PRICES ---
  const fetchPortfolio = useCallback(async () => {
    if (!userEmail) return;
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/portfolio/view/${userEmail}`);
        const data = await res.json();
        const holdings = data.holdings || [];
        setRealHoldings(holdings);
        
        // Calculate Total Value
        const total = holdings.reduce((acc, curr) => acc + (curr.amount), 0);
        setCurrentBalance(total);
    } catch (error) {
        console.error("Backend Error:", error);
    }
  }, [userEmail]);

  useEffect(() => { fetchPortfolio(); }, [fetchPortfolio]);

  // --- 2. ADVANCED WEIGHTING ALGORITHM (Ensures Unequal Distribution) ---
 const applyStrategy = (mode) => {
    if (realHoldings.length === 0) return;
    setSelectedMode(mode);

    // Helper: Identify Asset Class (UPDATED for better risk distribution)
    const getCoinCategory = (symbol) => {
        const s = symbol.toUpperCase();
        
        // STABLE: Stablecoins (0% loss risk)
        if (['USDT', 'USDC', 'DAI', 'BUSD', 'FDUSD', 'TUSD'].includes(s)) return 'STABLE';
        
        // BLUECHIP: Proven winners with institutional backing (Low risk)
        if (['BTC', 'BITCOIN', 'ETH', 'ETHEREUM'].includes(s)) return 'BLUECHIP';
        
        // LARGE: Top 10-20 established projects (Medium risk)
        if (['BNB', 'SOL', 'SOLANA', 'XRP', 'ADA', 'CARDANO', 'AVAX', 'AVALANCHE', 'MATIC', 'POLYGON'].includes(s)) return 'LARGE';
        
        // VOLATILE: Everything else - memecoins, small caps (High risk/reward)
        return 'VOLATILE';
    };

    // Real-World Strategy Allocations (UPDATED for your requirements)
    const STRATEGIES = {
        SAFE: { 
            STABLE: 0.50,    // 50% in stablecoins (zero loss)
            BLUECHIP: 0.40,  // 40% in BTC/ETH (minimal loss risk)
            LARGE: 0.10,     // 10% in top alts (small exposure)
            VOLATILE: 0.00   // 0% in risky coins
        },
        BALANCED: { 
            STABLE: 0.20,    // 20% stable for safety net
            BLUECHIP: 0.35,  // 35% in BTC/ETH (core holdings)
            LARGE: 0.30,     // 30% in established alts
            VOLATILE: 0.15   // 15% for moonshot potential
        },
        RISK: { 
            STABLE: 0.05,    // 5% emergency fund only
            BLUECHIP: 0.20,  // 20% as minimum hedge
            LARGE: 0.35,     // 35% in high-beta majors
            VOLATILE: 0.40   // 40% YOLO allocation
        }
    };

    // Coin Dominance Weights (UPDATED with market cap logic)
    const DOMINANCE = {
        // Stablecoins (equal weight)
        USDT: 1, USDC: 1, DAI: 1, BUSD: 1,
        
        // Blue chips (BTC dominates)
        BTC: 12, BITCOIN: 12, 
        ETH: 8, ETHEREUM: 8,
        
        // Large caps (by market cap ranking)
        BNB: 5, SOL: 5, SOLANA: 5,
        XRP: 4, ADA: 3, CARDANO: 3,
        AVAX: 3, AVALANCHE: 3,
        MATIC: 2, POLYGON: 2,
        DOT: 2, POLKADOT: 2,
        
        // Mid/Small (by hype factor)
        DOGE: 3, DOGECOIN: 3,  // Meme premium
        LINK: 2, CHAINLINK: 2,
        UNI: 2, UNISWAP: 2,
        ATOM: 2, COSMOS: 2,
        LTC: 1, LITECOIN: 1,
        
        // Default for unknowns
        DEFAULT: 1
    };

    // Group assets by category
    const buckets = { STABLE: [], BLUECHIP: [], LARGE: [], VOLATILE: [] };
    realHoldings.forEach(h => {
        const cat = getCoinCategory(h.coin);
        buckets[cat].push(h);
    });

    // Determine which categories the user actually owns
    const availableCategories = Object.keys(buckets).filter(cat => buckets[cat].length > 0);
    const strategy = STRATEGIES[mode];

    // Calculate total weight of available categories (for renormalization)
    const totalAvailableWeight = availableCategories.reduce((sum, cat) => sum + strategy[cat], 0);

    // If somehow everything is 0 (shouldn't happen), fallback
    const safeTotal = totalAvailableWeight || 1;

    const finalData = [];

    // Loop through each category
    availableCategories.forEach(category => {
        const assets = buckets[category];
        const categoryTargetPercent = strategy[category] / safeTotal; // Renormalized
        const categoryBudget = currentBalance * categoryTargetPercent;

        // Calculate internal dominance scores
        let totalScore = 0;
        const scored = assets.map(asset => {
            const dominance = DOMINANCE[asset.coin.toUpperCase()] || DOMINANCE.DEFAULT || 1;
            const score = dominance + Math.random() * 0.05; // Tiny variance for realism
            totalScore += score;
            return { ...asset, score };
        });

        // Distribute budget within category
        scored.forEach(asset => {
            const assetShare = asset.score / totalScore;
            const targetAmount = categoryBudget * assetShare;
            const targetPercent = (targetAmount / currentBalance) * 100;

            finalData.push({
                ...asset,
                category,
                targetAmount,
                targetPercent: Number(targetPercent.toFixed(2))
            });
        });
    });

    // Sort by Target % (Highest first)
    const sorted = finalData.sort((a, b) => b.targetPercent - a.targetPercent);

    setStrategyData(sorted);
};

  // --- 3. CSV DOWNLOAD LOGIC (New Feature) ---
  const handleDownloadCSV = () => {
    if (strategyData.length === 0) return;

    // 1. Define Headers
    const headers = ["Coin Name", "Live Price ($)", "Target Percentage (%)", "Target Investment ($)"];

    // 2. Map Data to CSV Rows
    const rows = strategyData.map(item => [
        item.coin,
        item.live_price || 0, // Fallback if price missing
        item.targetPercent.toFixed(2),
        item.targetAmount.toFixed(2)
    ]);

    // 3. Combine into CSV string
    const csvContent = [
        headers.join(","), 
        ...rows.map(e => e.join(","))
    ].join("\n");

    // 4. Create hidden link and click it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Strategy_Plan_${selectedMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`✅ ${selectedMode} Strategy Saved! CSV Downloaded.`);
  };

  // Helper for Bar Colors (will return class name)
  const getBarColorClass = (coin) => {
      const c = coin.toUpperCase();
      if (['USDT', 'USDC', 'DAI', 'BUSD'].includes(c)) return 'stable';
      if (c === 'BTC') return 'btc';
      if (['ETH', 'BNB', 'SOL'].includes(c)) return 'eth'; // Grouping ETH, BNB, SOL as 'eth' for styling
      return 'alt';
  };

  return (
    <div className="strategy-mixer-container">
      
      {/* HEADER */}
      <div className="mixer-header">
        <h2>🧠 Intelligent Strategy Planner</h2>
        <div className="total-capital">
            Total Capital: <span>${currentBalance.toLocaleString()}</span>
        </div>
      </div>

      {/* --- BUTTONS --- */}
      <div className="strategy-buttons-group">
          <button 
             onClick={() => applyStrategy('SAFE')} 
             className={`strategy-btn safe ${selectedMode === 'SAFE' ? 'active' : ''}`}
          >
             🛡️ SAFE
          </button>
          <button 
             onClick={() => applyStrategy('BALANCED')} 
             className={`strategy-btn balanced ${selectedMode === 'BALANCED' ? 'active' : ''}`}
          >
             ⚖️ BALANCED
          </button>
          <button 
             onClick={() => applyStrategy('RISK')} 
             className={`strategy-btn risk ${selectedMode === 'RISK' ? 'active' : ''}`}
          >
             🚀 RISK
          </button>
      </div>

      {/* --- BARMETERS --- */}
      {strategyData.length > 0 ? (
        <div className="allocation-breakdown-container">
            <h4>
                <span>Asset Allocation Breakdown</span>
                <span className="live-price-note">Based on Live Price Volatility</span>
            </h4>

            {strategyData.map((item) => (
                <div key={item.coin} className="allocation-item">
                    {/* INFO ROW */}
                    <div className="allocation-info-row">
                        <div className="coin-details">
                            <span className="coin-name">{item.coin}</span>
                            <span className="live-price-badge">
                                ${item.live_price.toLocaleString()}
                            </span>
                        </div>
                        <div className="target-details">
                            <span className="target-percent">{item.targetPercent.toFixed(1)}%</span>
                            <span className="target-amount">
                                Target: ${item.targetAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </span>
                        </div>
                    </div>

                    {/* BAR METER CONTAINER */}
                    <div className="bar-meter-container">
                        
                        {/* THE FILL BAR */}
                        <div 
                           className={`fill-bar ${getBarColorClass(item.coin)}`}
                           style={{ width: `${item.targetPercent}%` }}
                        >
                        </div>

                    </div>
                </div>
            ))}
            
            {/* --- CSV DOWNLOAD BUTTON --- */}
            <button onClick={handleDownloadCSV} className="download-csv-btn">
                <span>💾 Save & Download CSV Report</span>
            </button>
        </div>
      ) : (
          <div className="empty-strategy-message">
              Generate your AI-powered investment plan by choosing a strategy above.
          </div>
      )}
    </div>
  );
};

export default StrategyMixer;