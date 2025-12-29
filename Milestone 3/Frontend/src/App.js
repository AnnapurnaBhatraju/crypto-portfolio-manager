import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(localStorage.getItem('userEmail') || null);

  const handleLoginSuccess = (userEmail) => {
    localStorage.setItem('userEmail', userEmail);
    setUser(userEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  if (!user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ padding: '15px 25px', background: '#2E7D32', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>CryptoManager AI</span>
        <div>
           <span style={{ marginRight: '20px' }}>User: <strong>{user}</strong></span>
           <button onClick={handleLogout} style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', border: 'none', background: '#f44336', color: 'white' }}>Logout</button>
        </div>
      </nav>
      
      <div style={{ padding: '20px' }}>
        <Dashboard userEmail={user} /> 
      </div>
    </div>
  );
}

export default App;