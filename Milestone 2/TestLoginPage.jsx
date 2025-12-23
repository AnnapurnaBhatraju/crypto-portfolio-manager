
import React, { useState } from 'react';

// --- Configuration ---
const BACKEND_URL = 'http://localhost:8000';

const LoginPage = ({ onLoginSuccess }) => {
    // State to capture inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('Enter credentials to access the Portfolio Mixer.');

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('Authenticating...');
        
        try {
            // --- 1. Send Login Request to FastAPI ---
            // We use standard JSON POST request for Milestone 2 compatibility
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorDetail = await response.json();
                setMessage(`Login FAILED: ${errorDetail.detail}`);
                return;
            }

            const data = await response.json();
            
            // 🔑 SUCCESS TRIGGER
            // This informs App.js to switch components
            onLoginSuccess(data.email);

        } catch (error) {
            console.error("Login Error:", error);
            setMessage("Network error: Ensure main_api.py is running on port 8000.");
        }
    };
    
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: '#e8f5e9' 
        }}>
            <form onSubmit={handleLogin} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                width: '350px', 
                gap: '15px',
                padding: '40px', 
                backgroundColor: '#ffffff', 
                border: '2px solid #4CAF50', 
                borderRadius: '10px', 
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)' 
            }}>
                
                <h2 style={{ textAlign: 'center', color: '#2E7D32' }}>Crypto Manager Login</h2>
                
                <div>
                    <label htmlFor="email" style={{ color: '#2E7D32', fontWeight: 'bold' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter registered email (e.g. user@example.com)"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label htmlFor="password" style={{ color: '#2E7D32', fontWeight: 'bold' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
                    />
                </div>

                <p style={{ 
                    color: message.includes("FAILED") || message.includes("error") ? '#D32F2F' : '#2E7D32', 
                    fontSize: '14px',
                    textAlign: 'center' 
                }}>
                    {message}
                </p>

                <button type="submit" style={{ 
                    padding: '14px', 
                    backgroundColor: '#4CAF50', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginTop: '10px'
                }}>
                    Login to System
                </button>
            </form>
        </div>
    );
};

export default LoginPage;