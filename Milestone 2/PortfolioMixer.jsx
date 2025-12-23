

import React, { useState } from 'react';

const PortfolioMixer = ({ userEmail }) => {
    const [selected, setSelected] = useState([]);
    const [budget, setBudget] = useState(1000);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // All 56 unique coins from  dataset.csv
    const allCoins = [
        "Aave", "Algorand", "ApeCoin", "Aptos", "Avalanche", "BNB", "Basic Attention Token", "Binance USD", 
        "Bitcoin", "Bitcoin Cash", "Cardano", "Casper", "Chain", "Chainlink", "Chiliz", "Cosmos", 
        "Cronos", "Dai", "Decentraland", "Dogecoin", "EOS", "Elrond", "Ethereum", "Ethereum Classic", 
        "FTX Token", "Filecoin", "Flow", "Hedera", "Huobi Token", "Internet Computer", "Litecoin", "Maker", 
        "Monero", "NEAR Protocol", "OKB", "Polkadot", "Polygon", "Quant", "Ravencoin", "Shiba Inu", 
        "Solana", "Stellar", "THORChain", "TRON", "Terra Classic", "Tether", "Tezos", "The Sandbox", 
        "Theta Network", "Toncoin", "UNUS SED LEO", "USD Coin", "Uniswap", "VeChain", "Wrapped Bitcoin", "XRP"
    ];

    const toggle = (c) => setSelected(s => s.includes(c) ? s.filter(x => x!==c) : [...s, c]);

    const calculate = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/v1/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_email: userEmail, selected_coins: selected, total_investment: parseFloat(budget) })
            });
            const data = await res.json();
            setResult(data);
        } catch (e) { alert("Error connecting to server."); }
        setLoading(false);
    };

    return (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #4CAF50', borderRadius: '10px', backgroundColor: 'white' }}>
            <h3>Step 1: Set Your Investment Budget</h3>
            <input 
                type="number" value={budget} onChange={(e) => setBudget(e.target.value)} 
                style={{ padding: '10px', width: '200px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '5px' }} 
            />

            <h3 style={{ marginTop: '30px' }}>Step 2: Select Assets (Choose at least 2)</h3>
            <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #eee', padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {allCoins.map(c => (
                    <label key={c} style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input type="checkbox" onChange={() => toggle(c)} /> {c}
                    </label>
                ))}
            </div>

            <button 
                onClick={calculate} 
                disabled={loading || selected.length < 2} 
                style={{ marginTop: '20px', padding: '12px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                {loading ? "Optimizing Mix..." : "Calculate Profitable Mix"}
            </button>

            {result && result.suggested_mix && (
                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f1f8e9', border: '2px solid #2E7D32', borderRadius: '8px' }}>
                    <h2 style={{ color: '#2E7D32', margin: '0 0 15px 0' }}>Profitable Mix Suggested</h2>
                    {Object.entries(result.suggested_mix).map(([coin, info]) => (
                        <div key={coin} style={{ padding: '10px 0', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                            <span><strong>{coin}</strong> ({info.percentage} Mix)</span>
                            <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>Invest ${info.recommended_investment}</span>
                        </div>
                    ))}
                    <p style={{ marginTop: '15px', color: '#666' }}>Profitability Score: {result.max_sharpe_ratio.toFixed(4)}</p>
                </div>
            )}
        </div>
    );
};

export default PortfolioMixer;