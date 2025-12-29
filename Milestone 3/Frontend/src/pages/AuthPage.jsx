import React, { useState } from 'react';

const AuthPage = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Sign-up logic: Validate passwords match
        if (!isLogin && password !== confirmPassword) {
            setMessage("❌ Passwords do not match!");
            return;
        }

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
        
        try {
            // Change this line in your fetch call:
            const res = await fetch(`http://127.0.0.1:8000${endpoint}`, { // USE 127.0.0.1
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
});
            const data = await res.json();

            if (res.ok) {
                if (isLogin) {
                    onLoginSuccess(data.user_email); // Log user in
                } else {
                    setMessage("✅ Account created! Please log in.");
                    setIsLogin(true); // Switch to login view
                }
            } else {
                setMessage(`❌ ${data.detail || "Error occurred"}`);
            }
        } catch (err) {
            setMessage("❌ Server is offline. Check backend.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '12px', width: '350px', backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', color: '#2E7D32' }}>{isLogin ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input type="email" required style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    <label>Password</label>
                    <input type="password" required style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    {!isLogin && (
                        <>
                            <label>Confirm Password</label>
                            <input type="password" required style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </>
                    )}
                    
                    <button type="submit" style={btnStyle}>{isLogin ? "Sign In" : "Register"}</button>
                </form>
                
                <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', cursor: 'pointer', color: '#1976D2', marginTop: '15px' }}>
                    {isLogin ? "New user? Create an account" : "Already have an account? Log in"}
                </p>
                {message && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '12px', backgroundColor: '#2E7D32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default AuthPage;