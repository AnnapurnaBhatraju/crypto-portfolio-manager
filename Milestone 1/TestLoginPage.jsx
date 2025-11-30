
import React, { useState } from 'react';

// --- Configuration ---
// This URL must match your running FastAPI server
const BACKEND_URL = 'http://localhost:8000';

const LoginPage = () => {
    // State to capture inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('Enter credentials to test JWT login.');

    // Function to handle form submission and communicate with FastAPI
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('Attempting secure login...');
        
        // --- 1. Prepare Data for FastAPI ---
        // FastAPI expects data in URL-encoded form data (not JSON)
        const formBody = new URLSearchParams();
        formBody.append('username', email); // Sent as 'username' to FastAPI /token endpoint
        formBody.append('password', password);

        try {
            // --- 2. Send Login Request to /token endpoint ---
            const loginResponse = await fetch(`${BACKEND_URL}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody.toString()
            });

            if (!loginResponse.ok) {
                // If the response is 401 Unauthorized or another error
                const errorDetail = await loginResponse.json();
                setMessage(`Login FAILED: ${errorDetail.detail}. Check console.`);
                console.error("Login Failed:", errorDetail.detail);
                return;
            }

            const data = await loginResponse.json();
            const token = data.access_token;
            const role = data.user_role;
            console.log("Step 1 Success: JWT Token Received:", token);

            // --- 3. Verification Step: Use the token to access a secure endpoint ---
            // This proves the JWT works because the /users/me/role endpoint is protected.
            const secureResponse = await fetch(`${BACKEND_URL}/users/me/role`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Sending the token as the ID badge
                }
            });

            const userData = await secureResponse.json();
            
            // 🔑 FINAL SUCCESS CONFIRMATION
            const successMsg = `INTEGRATION SUCCESS! Role: ${role} (${userData.your_role})`;
            setMessage(successMsg);
            console.log(successMsg);
            alert(successMsg);

        } catch (error) {
            console.error("Integration Test Error:", error);
            setMessage("A network error occurred. Ensure FastAPI is running.");
        }
    };
    
    // --- Mayank's original component structure ---
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
                
                {/* Email Input */}
                <div>
                    <label htmlFor="email" style={{ color: '#2E7D32', fontWeight: 'bold' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., annapurna@teamcrypto.in"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" style={{ color: '#2E7D32', fontWeight: 'bold' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Status Message */}
                <p style={{ color: message.includes("SUCCESS") ? '#2E7D32' : '#D32F2F', fontWeight: 'bold', textAlign: 'center' }}>
                    {message}
                </p>

                {/* Log In Button */}
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
                    Test Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;