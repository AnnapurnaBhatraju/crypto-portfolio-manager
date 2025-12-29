import React, { useState } from 'react';

const PortfolioMixer = ({ userEmail }) => {
    const [selected, setSelected] = useState([]);
    const [budget, setBudget] = useState(1000);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const allCoins = ["Bitcoin", "Ethereum", "Solana", "Cardano", "Litecoin", "Dogecoin", "XRP"];

    const toggle = (coin) => {
        setSelected(prev => prev.includes(coin) ? prev.filter(c => c !== coin) : [...prev, coin]);
    };

    const calculate = async () => {
        setLoading(true);
        setSuccess(false);
        try {
            const res = await fetch("http://localhost:8000/api/v1/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_email: userEmail,
                    selected_coins: selected,
                    total_investment: budget
                })
            });
            await res.json();
            setSuccess(true);
        } catch (e) {
            console.error("Optimization failed", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>1. Select Assets & Budget</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {allCoins.map(c => (
                    <button key={c} onClick={() => toggle(c)} 
                        style={{ padding: '10px', backgroundColor: selected.includes(c) ? '#4CAF50' : '#f0f0f0', color: selected.includes(c) ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
                        {c}
                    </button>
                ))}
            </div>
            <label>Investment Budget ($): </label>
            <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} style={{ padding: '8px', marginBottom: '20px' }} />
            <br />
            <button onClick={calculate} disabled={loading || selected.length === 0} style={{ padding: '10px 20px', backgroundColor: '#2E7D32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {loading ? "Calculating..." : "Calculate & Save Mix"}
            </button>
            {success && <p style={{ color: 'green', fontWeight: 'bold' }}>✔️ Portfolio saved! Go to Risk Monitor.</p>}
        </div>
    );
};

export default PortfolioMixer;