import React, { useState } from 'react';

// ---------------------------------------------------------
// 1. IMPORT THE IMAGE HERE
// Ensure 12.jpg is in the same folder as this file
import bgImage from './12.jpg'; 
// ---------------------------------------------------------

// --- Configuration ---
const BACKEND_URL = 'http://localhost:8000';

// We receive navigation functions from App.js as props
const LoginPage = ({ onLoginSuccess, onBack }) => {
    
    // --- Logic State ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('Enter credentials to test JWT login.');

    // --- UI State ---
    const [focusedField, setFocusedField] = useState(null);
    const [isHoveringBtn, setIsHoveringBtn] = useState(false);

    // --- Core Logic (Unchanged from your code) ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('Attempting secure login...');
        
        // --- 1. Prepare Data for FastAPI ---
        const formBody = new URLSearchParams();
        formBody.append('username', email); 
        formBody.append('password', password);

        try {
             // --- 2. Send Login Request to /token endpoint ---
            const loginResponse = await fetch(`${BACKEND_URL}/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody.toString()
            });

            if (!loginResponse.ok) {
                const errorDetail = await loginResponse.json();
                setMessage(`Login FAILED: ${errorDetail.detail}`);
                console.error("Login Failed:", errorDetail.detail);
                return;
            }

            const data = await loginResponse.json();
            const token = data.access_token;
            const role = data.user_role;
            console.log("Step 1 Success: JWT Token Received:", token);

            // --- 3. Verification Step ---
            const secureResponse = await fetch(`${BACKEND_URL}/users/me/role`, {
                headers: { 'Authorization': `Bearer ${token}` } 
            });

            const userData = await secureResponse.json();
            
            // 🔑 FINAL SUCCESS
            const successMsg = `SUCCESS! Role: ${role} (${userData.your_role})`;
            setMessage(successMsg);
            
            // --- INTEGRATION: Switch to Dashboard after 1 second ---
            setTimeout(() => {
                onLoginSuccess();
            }, 1000);

        } catch (error) {
            console.error("Integration Test Error:", error);
            setMessage("Network error. Ensure FastAPI is running.");
        }
    };

    // --- Premium Golden/Black Styles ---
    const goldGradient = 'linear-gradient(45deg, #FFD700, #FDB931, #C0A040)';

    const styles = {
        container: {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            fontFamily: "'Playfair Display', 'Times New Roman', serif"
        },
        footer: {
            position: 'absolute',
            backgroundColor: '#02041fff',
            bottom: '0',
            width: '100%',
            padding: '15px 0',
            textAlign: 'center',
            color: '#888',
            fontSize: '15px',
            letterSpacing: '1px',
            zIndex: 10
        },
        copyright: {
            color: '#D4AF37', 
            fontWeight: 'bold'
        },
        card: {
            width: '360px', 
            padding: '50px 40px', 
            backgroundColor: 'rgba(6, 10, 31, 0.85)', // Slightly darker for readability
            backdropFilter: 'blur(8px)',
            border: '1px solid #444',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.15)',
            borderRadius: '12px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '25px',
        },
        header: {
            textAlign: 'center', 
            background: goldGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '0',
            letterSpacing: '1px'
        },
        subHeader: {
            textAlign: 'center',
            color: '#aaa',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginTop: '-20px',
            marginBottom: '10px'
        },
        label: {
            color: '#D4AF37', 
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '8px',
            display: 'block',
            letterSpacing: '1px'
        },
        input: (fieldName) => ({
            width: '100%', 
            padding: '14px', 
            backgroundColor: '#111',
            border: focusedField === fieldName ? '1px solid #FFD700' : '1px solid #444',
            color: '#fff', 
            borderRadius: '4px', 
            outline: 'none',
            fontSize: '16px',
            boxSizing: 'border-box',
            transition: 'all 0.4s ease',
            boxShadow: focusedField === fieldName ? '0 0 15px rgba(255, 215, 0, 0.2)' : 'none'
        }),
        button: {
            padding: '16px', 
            background: goldGradient,
            color: '#000', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer', 
            fontWeight: 'bold',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginTop: '10px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            transform: isHoveringBtn ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: isHoveringBtn ? '0 5px 20px rgba(255, 215, 0, 0.4)' : 'none'
        },
        statusMsg: {
            textAlign: 'center',
            fontSize: '13px',
            minHeight: '20px',
            color: message.includes('SUCCESS') ? '#FFD700' : (message.includes('FAILED') ? '#ff4d4d' : '#888'),
            fontStyle: 'italic'
        },
        // New Style for Back Button
        backBtn: {
            background: 'none',
            border: 'none',
            color: '#666',
            marginTop: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'underline'
        }
    };

    return (
        <div style={styles.container}>
            
            <form onSubmit={handleLogin} style={styles.card}>
                
                <h2 style={styles.header}>GOLD MEMBER</h2>
                <p style={styles.subHeader}>Exclusive Access</p>
                
                {/* Email / Username */}
                <div>
                    <label htmlFor="email" style={styles.label}>CLIENT ID</label>
                    <input
                        type="text" // Changed to text to accommodate usernames
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vip@crypto.com"
                        required
                        style={styles.input('email')}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" style={styles.label}>SECURITY KEY</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        style={styles.input('password')}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>

                <div style={styles.statusMsg}>
                    {message}
                </div>

                <button 
                    type="submit" 
                    style={styles.button}
                    onMouseEnter={() => setIsHoveringBtn(true)}
                    onMouseLeave={() => setIsHoveringBtn(false)}
                >
                    Authenticate
                </button>

                {/* --- NAVIGATION: Back Button --- */}
                <button type="button" onClick={onBack} style={styles.backBtn}>
                    Back to Home
                </button>
            </form>

             {/* --- FOOTER --- */}
            <footer style={styles.footer}>
                <p>Copyright <span style={styles.copyright}>© 2026</span> Crypto Manager. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LoginPage;