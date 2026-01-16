import React, { useState } from 'react';
import './App.css'; // Import the new App.css

// Import all your components
import Intro from './Intro';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import StrategyMixer from './StrategyMixer'; // Assuming this is the old StrategyMixer

function App() {
  // 1. GLOBAL STATE
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- HANDLERS ---
  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setCurrentScreen('main'); 
  };

  const handleLogout = () => {
    setUserEmail('');
    setCurrentScreen('intro');
    setActiveTab('dashboard'); 
  };

  // --- RENDER LOGIC ---

  if (currentScreen === 'intro') {
    return <Intro onNavigateToLogin={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess} 
        onBack={() => setCurrentScreen('intro')}
      />
    );
  }

  // 3. Show Main Application
  return (
    <div className="app-container">
      
      {/* GLOBAL HEADER */}
      <header className="app-header">
        <div className="header-left-group">
          <h2 className="app-logo">Crypto Manager</h2>
          <span className="welcome-message">| Welcome, {userEmail}</span>
        </div>
        
        {/* TAB NAVIGATION BUTTONS */}
        <div className="tab-nav-group">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : 'inactive'}`}
          >
            📊 Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('strategy')}
            className={`tab-button ${activeTab === 'strategy' ? 'active' : 'inactive'}`}
          >
            🤖 Risk Strategy
          </button>
        </div>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      {/* CONTENT AREA */}
      <main className="main-content-area">
        
        {/* Render Dashboard Component */}
        {activeTab === 'dashboard' && (
          <Dashboard userEmail={userEmail} />
        )}

        {/* --- FIX IS HERE: Pass userEmail to StrategyMixer --- */}
        {/* IMPORTANT: If you meant to use the StrategyMixer with the risk slider, 
           you'll need to create a new component file for it (e.g., RiskSliderStrategyMixer.js)
           and import/render that here instead. The CSS is ready for it.
        */}
        {activeTab === 'strategy' && (
          <StrategyMixer userEmail={userEmail} />
        )}

      </main>

      {/* FOOTER (added to App.js) */}
      <footer className="app-footer">
        <p>Python Crypto Investment Manager</p>
        <p>Copyright &copy; 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;