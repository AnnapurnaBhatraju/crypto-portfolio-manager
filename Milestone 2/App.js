
import React, { useState } from 'react';
import TestLoginPage from './TestLoginPage'; 
import PortfolioMixer from './components/PortfolioMixer';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <TestLoginPage onLoginSuccess={(email) => setUser(email)} />
      ) : (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Welcome, <span style={{color: '#2E7D32'}}>{user}</span></h2>
            <button onClick={() => setUser(null)} style={{ padding: '8px 15px', cursor: 'pointer' }}>Logout</button>
          </div>
          <PortfolioMixer userEmail={user} />
        </div>
      )}
    </div>
  );
}

export default App;