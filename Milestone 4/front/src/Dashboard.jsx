import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css'; // Import the new CSS file

const Dashboard = ({ userEmail }) => {
    // 1. DATA STATE
    const [holdings, setHoldings] = useState([]);
    
    // 2. MIXER STATE
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [budget, setBudget] = useState(5000);
    const [aiSuggestion, setAiSuggestion] = useState(null);
    
    // 3. UI STATE
    const [view, setView] = useState('monitor'); // 'monitor' or 'mixer'
    const [loading, setLoading] = useState(false);

    // List of available assets
    const sampleAssets = [
        "Bitcoin", "Ethereum", "Solana", "Cardano", "Dogecoin", 
        "XRP", "Litecoin", "Polkadot", "Polygon", "Chainlink", 
        "Avalanche", "Tron", "Uniswap", "Cosmos", "Monero", 
        "Stellar", "Near", "Optimism", "Algorand", "Aave"
    ];

    // --- FETCH DATA (Refreshes the Monitor) ---
    const fetchPortfolio = useCallback(async () => {
        if (!userEmail) return;
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/portfolio/view/${userEmail}`);
            if (!res.ok) throw new Error("Failed to fetch");
            
            const data = await res.json();
            setHoldings(data.holdings || []);
        } catch (e) { 
            console.error("Monitor sync error:", e); 
        } finally {
            setLoading(false);
        }
    }, [userEmail]);

    // --- EFFECT: Reload data whenever View changes to 'monitor' ---
    useEffect(() => {
        if (view === 'monitor') {
            fetchPortfolio();
        }
    }, [view, fetchPortfolio]);

    // --- HANDLER: Download CSV ---
    const handleDownloadReport = () => {
        window.open(`http://127.0.0.1:8000/api/portfolio/download-report/${userEmail}`, '_blank');
    };

    // --- HANDLER: Generate AI Mix ---
    const handleGenerateMix = async () => {
        if (selectedCoins.length < 2) return alert("Please select at least 2 assets.");
        
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/portfolio/suggest-rebalance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, selected_coins: selectedCoins, total_budget: budget })
            });

            const data = await res.json();
            if (res.ok) {
                setAiSuggestion(data);
            } else {
                alert("Error: " + (data.detail || "Unknown error"));
            }
        } catch (e) {
            alert("Connection failed. Is backend running?");
        }
    };

    // --- HANDLER: Save & Finalize ---
    const savePortfolio = async () => {
        if (!aiSuggestion) return;

        const payload = {
            email: userEmail,
            holdings: Object.entries(aiSuggestion.suggested_mix).map(([coin, weight]) => ({
                coin: coin, 
                amount: parseFloat((weight * budget).toFixed(2)), 
                purchase_price: [20, 50, 100, 500, 1000][Math.floor(Math.random() * 5)] // Mock price
            }))
        };

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/portfolio/finalize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("✅ Portfolio Updated Successfully!");
                
                // --- CLEANUP STEPS (Fixes your issue) ---
                setAiSuggestion(null);   // Clear the AI result
                setSelectedCoins([]);    // Clear the selected coins grid
                setView('monitor');      // Switch tab
                fetchPortfolio();        // Force refresh data
            } else {
                alert("Failed to save.");
            }
        } catch (e) {
            console.error(e);
        }
    };

    // --- HANDLER: Delete Asset ---
    const deleteAsset = async (coin) => {
        if (window.confirm(`Are you sure you want to delete ${coin}?`)) {
            try {
                // 1. Optimistic Update: Remove from UI immediately so it doesn't look stuck
                setHoldings(prev => prev.filter(h => h.coin !== coin));

                // 2. Send request to backend
                await fetch(`http://127.0.0.1:8000/api/portfolio/remove/${userEmail}/${coin}`, { method: 'DELETE' });
                
                // 3. Double check sync
                fetchPortfolio();
            } catch (e) {
                alert("Delete failed.");
                fetchPortfolio(); // Revert on error
            }
        }
    };

    return (
        <div className="dashboard-container">
            
            {/* NAV TABS */}
            <nav className="dashboard-nav-tabs">
                <button 
                    onClick={() => setView('monitor')} 
                    className={view === 'monitor' ? 'active' : 'inactive'}
                >
                    📊 Monitor Portfolio
                </button>
                <button 
                    onClick={() => setView('mixer')} 
                    className={view === 'mixer' ? 'active' : 'inactive'}
                >
                    🧪 AI Strategy Mixer
                </button>
            </nav>

            {/* VIEW 1: MONITOR */}
            {view === 'monitor' ? (
                <div className="dashboard-card">
                    <div className="monitor-header">
                        <h3>
                            Live Portfolio {loading && <span className="sync-status">(Syncing...)</span>}
                        </h3>
                        {holdings.length > 0 && (
                            <button onClick={handleDownloadReport} className="download-btn">📥 Download CSV</button>
                        )}
                    </div>

                    {holdings.length > 0 ? (
                        <div className="holdings-list">
                            {holdings.map(h => (
                                <div key={h.coin} className="holding-row">
                                    <span className="holding-coin"><strong>{h.coin}</strong></span>
                                    <span className="holding-amount">${h.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    <span className="holding-price">Price: ${h.live_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    <span className={`holding-status ${h.status === 'DANGER' ? 'danger' : 'safe'}`}>
                                        {h.status === 'DANGER' ? '⚠️' : '✅'} {h.status}
                                    </span>
                                    <button onClick={() => deleteAsset(h.coin)} className="delete-btn">Remove</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-portfolio">
                            <p>Your portfolio is empty.</p>
                            <button onClick={() => setView('mixer')} className="create-mix-btn">Create New Mix</button>
                        </div>
                    )}
                </div>
            ) : (
                /* VIEW 2: MIXER */
                <div className="dashboard-card">
                    <div className="mixer-header">
                        <h3>AI Profitable Mix Predictor</h3>
                        {selectedCoins.length > 0 && (
                            <button onClick={() => setSelectedCoins([])} className="clear-selection-btn">
                                Clear Selection
                            </button>
                        )}
                    </div>
                    
                    {/* Coin Grid */}
                    <div className="coin-grid">
                        {sampleAssets.map(c => (
                            <button 
                                key={c} 
                                onClick={() => setSelectedCoins(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
                                className={`coin-button ${selectedCoins.includes(c) ? 'selected' : ''}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="mixer-controls">
                        <label><strong>Total Budget ($): </strong></label>
                        <input 
                            type="number" 
                            value={budget} 
                            onChange={e => setBudget(e.target.value)} 
                        />
                        <button onClick={handleGenerateMix} className="generate-mix-btn">Generate Smart Allocation</button>
                    </div>

                    {aiSuggestion && (
                        <div className="ai-results">
                            <h4>✨ Smart Portfolio Allocation</h4>
                            <div>
                                {Object.entries(aiSuggestion.suggested_mix).map(([coin, weight]) => (
                                    <div key={coin} className="ai-mix-item">
                                        <span>{coin}</span>
                                        <strong>{(weight * 100).toFixed(1)}% (${(weight * budget).toFixed(0)})</strong>
                                    </div>
                                ))}
                            </div>
                            <button onClick={savePortfolio} className="finalize-btn">Finalize & Save to Portfolio</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;