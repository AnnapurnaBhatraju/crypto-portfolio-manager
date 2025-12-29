import React, { useState, useEffect, useCallback } from 'react';

const Dashboard = ({ userEmail }) => {
    const [holdings, setHoldings] = useState([]);
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [budget, setBudget] = useState(5000);
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [view, setView] = useState('monitor'); 

    const sampleAssets = [
        "Bitcoin", "Ethereum", "Solana", "Cardano", "Dogecoin", 
        "XRP", "Litecoin", "Polkadot", "Polygon", "Chainlink", 
        "Avalanche", "Tron", "Uniswap", "Cosmos", "Monero", 
        "Stellar", "Near", "Optimism", "Algorand", "Aave"
    ];

    const fetchPortfolio = useCallback(async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/portfolio/view/${userEmail}`);
            const data = await res.json();
            setHoldings(data.holdings || []);
        } catch (e) { console.error("Monitor failed to sync."); }
    }, [userEmail]);

    const handleDownloadReport = () => {
        window.open(`http://127.0.0.1:8000/api/portfolio/download-report/${userEmail}`, '_blank');
    };

    const handleGenerateMix = async () => {
        if (selectedCoins.length < 2) return alert("Select at least 2 assets!");
        const res = await fetch(`http://127.0.0.1:8000/api/portfolio/suggest-rebalance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, selected_coins: selectedCoins, total_budget: budget })
        });
        const data = await res.json();
        if (res.ok) setAiSuggestion(data);
        else alert("Math Error: " + data.detail);
    };

    const savePortfolio = async () => {
        const payload = {
            email: userEmail,
            holdings: Object.entries(aiSuggestion.suggested_mix).map(([coin, weight]) => ({
                coin: coin, 
                amount: parseFloat((weight * budget).toFixed(2)), 
                purchase_price: [20, 50, 100, 500, 1000][Math.floor(Math.random() * 5)]
            }))
        };
        const res = await fetch(`http://127.0.0.1:8000/api/portfolio/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            alert("✅ Portfolio Saved Successfully!");
            setAiSuggestion(null);
            setView('monitor');
            fetchPortfolio();
        }
    };

    const deleteAsset = async (coin) => {
        if (window.confirm(`Delete ${coin}?`)) {
            await fetch(`http://127.0.0.1:8000/api/portfolio/remove/${userEmail}/${coin}`, { method: 'DELETE' });
            fetchPortfolio();
        }
    };

    useEffect(() => { fetchPortfolio(); }, [fetchPortfolio]);

    return (
        <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <nav style={{ marginBottom: '30px', display: 'flex', gap: '15px' }}>
                <button onClick={() => setView('monitor')} style={view === 'monitor' ? activeTab : inactiveTab}>Monitor Portfolio</button>
                <button onClick={() => setView('mixer')} style={view === 'mixer' ? activeTab : inactiveTab}>AI Strategy Mixer</button>
            </nav>

            {view === 'monitor' ? (
                <div style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{color: '#2E7D32', margin: 0}}>📊 Live Portfolio Risk Monitor</h3>
                        {holdings.length > 0 && (
                            <button onClick={handleDownloadReport} style={downloadBtn}>📥 Download CSV Report</button>
                        )}
                    </div>

                    {holdings.length > 0 ? holdings.map(h => (
                        <div key={h.coin} style={row}>
                            <span style={{width: '20%'}}><strong>{h.coin.toUpperCase()}</strong></span>
                            <span style={{width: '20%'}}>${h.amount.toLocaleString()}</span>
                            <span style={{width: '20%'}}>Live: ${h.live_price?.toLocaleString()}</span>
                            <span style={{width: '30%', fontWeight: 'bold'}}>{h.badge} {h.status}</span>
                            <button onClick={() => deleteAsset(h.coin)} style={delBtn}>Delete</button>
                        </div>
                    )) : <p>Portfolio empty. Create a strategy in the mixer tab!</p>}
                </div>
            ) : (
                <div style={card}>
                    <h3>🤖 AI Profitable Mix Predictor</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {sampleAssets.map(c => (
                            <button key={c} onClick={() => setSelectedCoins(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
                                    style={{ padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedCoins.includes(c) ? '#2E7D32' : '#eee', color: selectedCoins.includes(c) ? 'white' : 'black' }}>
                                {c}
                            </button>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Target Budget ($): </label>
                        <input type="number" value={budget} onChange={e => setBudget(e.target.value)} style={{ padding: '8px', width: '100px' }} />
                        <button onClick={handleGenerateMix} style={genBtn}>Generate Mix</button>
                    </div>

                    {aiSuggestion && (
                        <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '10px' }}>
                            <h4>AI Optimal Suggestion:</h4>
                            {Object.entries(aiSuggestion.suggested_mix).map(([coin, weight]) => (
                                <p key={coin}>{coin}: <strong>{(weight * 100).toFixed(2)}%</strong> (${(weight * budget).toFixed(2)})</p>
                            ))}
                            <button onClick={savePortfolio} style={finalizeBtn}>Finalize & Save Portfolio</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const activeTab = { background: '#2E7D32', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const inactiveTab = { background: '#eee', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const card = { background: '#fff', padding: '30px', borderRadius: '15px', border: '1px solid #ddd', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const row = { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' };
const delBtn = { color: 'red', border: 'none', background: 'none', cursor: 'pointer' };
const genBtn = { marginLeft: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#333', color: 'white', borderRadius: '5px' };
const finalizeBtn = { marginTop: '15px', backgroundColor: '#2E7D32', color: 'white', padding: '12px 25px', borderRadius: '5px', border: 'none', cursor: 'pointer' };
const downloadBtn = { backgroundColor: '#2E7D32', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default Dashboard;