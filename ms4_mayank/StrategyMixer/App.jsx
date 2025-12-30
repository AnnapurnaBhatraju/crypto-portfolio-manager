import React, { useState, useEffect } from 'react';
import './App.css';

const StrategyMixer = () => {
  // 1. User Input: Risk Appetite (0 = Safe, 100 = Degen)
  const [riskScore, setRiskScore] = useState(50);
  
  // 2. Automated Rule State
  const [allocation, setAllocation] = useState({
    BTC: 40,
    ETH: 30,
    USDT: 30
  });

  // 3. Dynamic Feedback State
  const [rebalanceTrigger, setRebalanceTrigger] = useState(null);

  // AUTOMATION LOGIC: 
  // Automatically adjust mix based on Risk Slider
  useEffect(() => {
    // Math logic: 
    // As risk goes UP, USDT goes DOWN, BTC/ETH go UP.
    // As risk goes DOWN, USDT goes UP.
    
    const usdt = Math.max(5, 60 - (riskScore * 0.55)); // Min 5%, Max 60%
    const remaining = 100 - usdt;
    
    // Split remaining between BTC and ETH based on risk
    // Higher risk = more ETH ratio compared to BTC
    const ethRatio = 0.3 + (riskScore / 200); // 0.3 to 0.8 ratio
    const eth = remaining * ethRatio;
    const btc = remaining - eth;

    setAllocation({
      BTC: Math.round(btc),
      ETH: Math.round(eth),
      USDT: Math.round(usdt)
    });

    // Reset feedback on change
    setRebalanceTrigger(null);
  }, [riskScore]);

  // DYNAMIC FEEDBACK LOGIC:
  // Simulate a "Hard Situation" (Milestone 4 requirement)
  const simulateScenario = (type) => {
    if (type === 'crash') {
      // Simulate market dropping. Stablecoin % shoots up relative to others.
      // Logic: If USDT allocation target is 20%, but market crashes, 
      // crypto value drops, making USDT represent 35% of portfolio value.
      const deviation = allocation.USDT + 15; 
      setRebalanceTrigger({
        msg: `⚠️ CRASH TEST: USDT Holdings would spike to ${deviation}%. Rule triggers automatic BUY of Crypto.`,
        type: 'buy'
      });
    } else if (type === 'pump') {
      setRebalanceTrigger({
        msg: `🚀 PUMP TEST: Crypto value soars. Rule triggers automatic SELL to secure profits into USDT.`,
        type: 'sell'
      });
    }
  };

  const getRiskLabel = () => {
    if (riskScore < 30) return "Conservative (Capital Preservation)";
    if (riskScore < 70) return "Balanced (Growth & Safety)";
    return "Aggressive (Max Multipliers)";
  };

  return (
    <div className="mixer-container">
      <h2>🤖 AI Strategy Mixer</h2>
      <p style={{color: '#a0a0a0', marginTop: '-10px'}}>
        Adjust risk appetite to auto-generate spreading rules.
      </p>

      <div className="control-panel">
        
        {/* COMPONENT 1: Risk Slider */}
        <div className="slider-group">
          <label>Risk Appetite: {riskScore}/100</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={riskScore} 
            onChange={(e) => setRiskScore(e.target.value)}
            className="risk-slider"
          />
          <div className="risk-label">
            <span>🛡️ Safety</span>
            <span>🔥 Degen</span>
          </div>
          <div style={{textAlign: 'center', marginTop: '15px', color: '#4caf50', fontWeight: 'bold'}}>
            {getRiskLabel()}
          </div>
          
          <div style={{marginTop: '30px', borderTop: '1px solid #333', paddingTop: '15px'}}>
            <label>Test Rules vs Hard Situations:</label>
            <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
              <button onClick={() => simulateScenario('crash')} style={{padding: '8px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                Simulate -30% Crash
              </button>
              <button onClick={() => simulateScenario('pump')} style={{padding: '8px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                Simulate +50% Pump
              </button>
            </div>
          </div>
        </div>

        {/* COMPONENT 2: Visual Indicators */}
        <div className="viz-group">
          <h3>Target Allocation Rules</h3>
          
          {/* BTC BAR */}
          <div className="asset-row">
            <div className="asset-label">BTC</div>
            <div className="bar-container">
              <div className="bar-fill" style={{width: `${allocation.BTC}%`, backgroundColor: '#f2a900'}}>
                {allocation.BTC}%
              </div>
              {/* Visual Tolerance Markers (+/- 5%) */}
              <div className="tolerance-marker" style={{left: `${allocation.BTC - 5}%`}}></div>
              <div className="tolerance-marker" style={{left: `${allocation.BTC + 5}%`}}></div>
            </div>
          </div>

          {/* ETH BAR */}
          <div className="asset-row">
            <div className="asset-label">ETH</div>
            <div className="bar-container">
              <div className="bar-fill" style={{width: `${allocation.ETH}%`, backgroundColor: '#627eea'}}>
                {allocation.ETH}%
              </div>
              <div className="tolerance-marker" style={{left: `${allocation.ETH - 5}%`}}></div>
              <div className="tolerance-marker" style={{left: `${allocation.ETH + 5}%`}}></div>
            </div>
          </div>

          {/* USDT BAR */}
          <div className="asset-row">
            <div className="asset-label">USDT</div>
            <div className="bar-container">
              <div className="bar-fill" style={{width: `${allocation.USDT}%`, backgroundColor: '#26a17b'}}>
                {allocation.USDT}%
              </div>
              <div className="tolerance-marker" style={{left: `${allocation.USDT - 2}%`}}></div>
              <div className="tolerance-marker" style={{left: `${allocation.USDT + 2}%`}}></div>
            </div>
          </div>

          {/* Dynamic Feedback Area */}
          <div style={{minHeight: '60px', marginTop: '20px'}}>
            {rebalanceTrigger && (
              <div className="scenario-badge">
                {rebalanceTrigger.msg}
              </div>
            )}
          </div>

        </div>
      </div>
      
      <button style={{
        width: '100%', 
        padding: '15px', 
        background: '#0f3460', 
        color: 'white', 
        border: '1px solid #4caf50', 
        fontSize: '1rem', 
        cursor: 'pointer',
        borderRadius: '6px'
      }}>
        Save Automation Rules
      </button>
    </div>
  );
};

export default StrategyMixer;