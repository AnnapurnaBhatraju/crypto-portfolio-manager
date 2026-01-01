import React, { useState } from 'react';
import './App.css';

// Import your pages
import Intro from './Intro';
import LoginPage from './LoginPage';
import StrategyMixer from './StrategyMixer';

function App() {
  // 1. STATE: Tracks which screen is visible ('intro', 'login', or 'dashboard')
  const [currentView, setCurrentView] = useState('intro');

  // --- DASHBOARD LOGIC (Kept from before) ---
  const [simResults, setSimResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const runStressTest = (scenario) => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimResults({
        scenario: scenario,
        riskScore: 'High',
        projectedLoss: '-12%',
        recommendation: 'Auto-rebalance triggered'
      });
      setIsSimulating(false);
    }, 1500);
  };

  // --- NAVIGATION LOGIC ---

  // A. IF State is 'intro' -> Show Landing Page
  if (currentView === 'intro') {
    return (
      <Intro 
        // We pass this function to Intro.js so its buttons can change the state
        onNavigateToLogin={() => setCurrentView('login')} 
      />
    );
  }

  // B. IF State is 'login' -> Show Login Form
  if (currentView === 'login') {
    return (
      <LoginPage 
        // Passed to LoginPage: What to do on Success? -> Go to Dashboard
        onLoginSuccess={() => setCurrentView('dashboard')} 
        // Passed to LoginPage: What to do on Back? -> Go to Intro
        onBack={() => setCurrentView('intro')}
      />
    );
  }

  // C. IF State is 'dashboard' -> Show Main App
  return (
    <div className="container">
      <header className="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1>Crypto Manager Dashboard</h1>
          <p>Milestone 4: Spreading Rules & Stress Testing</p>
        </div>
        {/* LOGOUT BUTTON: Sets view back to Intro */}
        <button 
          onClick={() => setCurrentView('intro')} 
          style={{width: 'auto', background: 'transparent', border: '1px solid #444', padding: '8px 15px', color: '#fff', cursor: 'pointer'}}
        >
          Logout
        </button>
      </header>

      {/* Mayank's Task: The AI Strategy Mixer */}
      <section style={{ marginBottom: '40px' }}>
        <StrategyMixer />
      </section>

      <div className="grid">
        {/* Stress Testing */}
        <div className="card">
          <h2>Stress Test Simulator</h2>
          <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
            <button onClick={() => runStressTest('Flash Crash')}>Test Crash</button>
            <button onClick={() => runStressTest('Bull Run')}>Test Bull Run</button>
          </div>
          
          {isSimulating && <p style={{color: '#ff9800'}}>Running Parallel Tasks...</p>}
          
          {simResults && !isSimulating && (
            <div style={{padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px'}}>
              <strong>Result:</strong> {simResults.recommendation}
            </div>
          )}
        </div>
        
        <div className="card">
          <h2>Backend Status</h2>
          <p>Connected via JWT Auth.</p>
          <p>Active Threads: 4 (Parallel Checks)</p>
        </div>
      </div>
    </div>
  );
}

export default App;