import React, { useState } from 'react';

const LoginPage = () => {
  // 1. Data Capture
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Function Link
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Button Clicked");
    console.log("Captured Email:", email);
    console.log("Captured Password:", password);
  };

  return (
    // Main Page Container (Added background color and centering)
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',       // Full screen height
      backgroundColor: '#e8f5e9' // Light green background
    }}>
      
      {/* Login Box (Added border, white background, and padding) */}
      <form onSubmit={handleLogin} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '300px', 
        gap: '15px',
        padding: '30px',            // Inner spacing
        backgroundColor: '#ffffff', // White box background
        border: '2px solid #4CAF50',// Green Border
        borderRadius: '10px',       // Rounded corners
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Soft shadow
      }}>
        
        <h2 style={{ textAlign: 'center', color: '#2E7D32' }}>Login</h2>

        {/* Email Input */}
        <div>
          <label htmlFor="email" style={{ color: '#2E7D32', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '5px', 
              border: '1px solid #ccc', 
              borderRadius: '5px',
              boxSizing: 'border-box' // Ensures padding doesn't break width
            }}
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
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '5px', 
              border: '1px solid #ccc', 
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Log In Button (Changed to Green) */}
        <button type="submit" style={{ 
          padding: '12px', 
          backgroundColor: '#4CAF50', // Green button
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer', 
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '10px'
        }}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;