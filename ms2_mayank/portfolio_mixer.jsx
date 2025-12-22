//  must install to run in react
// npm install recharts react-select react-currency-input-field

import React, { useState } from 'react';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 1. Real Crypto Options , temporary
const cryptoOptions = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'SOL', label: 'Solana (SOL)' },
  { value: 'ADA', label: 'Cardano (ADA)' },
  { value: 'DOT', label: 'Polkadot (DOT)' },
  { value: 'XRP', label: 'Ripple (XRP)' },
  { value: 'MATIC', label: 'Polygon (MATIC)' },
];

// 2. Chart Colors , you can add more
const COLORS = [
  '#10B981', // Emerald Green
  '#3B82F6', // Blue
  '#F59E0B', // Amber
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#8B5CF6', // Violet
  '#14B8A6', // Teal
];

const InvestmentPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 3. Optimization Logic (With "Penny Perfect" distribution)
  const handleOptimize = () => {
    console.log("Optimized successful");

    if (selectedCoins.length === 0) {
      alert("Please select at least one asset.");
      setShowChart(false);
      return;
    }

    if (!amount) {
      alert("Please enter an investment amount.");
      return;
    }

    // Convert string input (e.g., "1,000") to float
    const totalAmount = parseFloat(amount.replace(/,/g, ''));
    const count = selectedCoins.length;

    // ALGORITHM: Distribute amount ensuring total equals input exactly

    // Just used for exact distribution ,you logic as you want 

    // 1. Calculate base amount per coin (floored to 2 decimals)
    const baseAmount = Math.floor((totalAmount / count) * 100) / 100;

    // 2. Calculate total allocated so far
    const allocatedSoFar = baseAmount * count;

    // 3. Find the remainder (due to rounding)
    // We use Math.round to avoid floating point issues like 0.0099999
    let remainder = Math.round((totalAmount - allocatedSoFar) * 100) / 100;

    const calculatedData = selectedCoins.map((coin, index) => {
      let finalCoinAmount = baseAmount;

      // Distribute the remainder pennies to the first few coins
      // If remainder is 0.02, the first 2 coins get +0.01 each.
      if (remainder > 0) {
        finalCoinAmount += 0.01;
        remainder = Math.round((remainder - 0.01) * 100) / 100;
      }

      return {
        name: coin.label,
        value: Number(finalCoinAmount.toFixed(2)), // This is the $ amount
      };
    });

    setChartData(calculatedData);
    setShowChart(true);
  };

  // 4. Custom Styles for React-Select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#10B981' : '#E5E7EB',
      boxShadow: state.isFocused ? '0 0 0 1px #10B981' : null,
      '&:hover': { borderColor: '#10B981' },
      padding: '4px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#D1FAE5',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#065F46',
      fontWeight: '600',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#065F46',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#10B981',
        color: 'white',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#10B981' 
        : state.isFocused 
          ? '#D1FAE5' 
          : null,
      color: state.isSelected ? 'white' : '#374151',
      cursor: 'pointer',
    }),
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        <div style={styles.headerContainer}>
          <h2 style={styles.heading}>Crypto Distribution Optimizer</h2>
          <p style={styles.subHeading}>Data-driven decisions for digital wealth</p>
        </div>

        {/* Input: Amount */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Enter Investment Amount</label>
          <CurrencyInput
            id="investment-amount"
            name="investment-amount"
            placeholder="e.g. 10,000"
            prefix="$"
            decimalsLimit={2}
            onValueChange={(value) => setAmount(value)}
            style={styles.input}
          />
        </div>

        {/* Input: Select */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Select Bitcoins</label>
          <Select
            options={cryptoOptions}
            isMulti
            onChange={setSelectedCoins}
            placeholder="Search and select Bitcoins..."
            styles={customSelectStyles}
          />
        </div>

        {/* Button */}
        <button 
          onClick={handleOptimize} 
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Optimize Portfolio
        </button>

        {/* Result: Pie Chart & Amount List */}
        {showChart && (
          <div style={styles.chartSection}>
            <div style={styles.divider}></div>
            <h3 style={styles.chartHeader}>Pie Chart Distribution</h3>
            <p style={styles.chartSubText}>Total Capital: <strong>${amount}</strong></p>
            
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // Calculate % for the label based on the $ amount vs Total
                    label={({ value }) => {
                        const total = parseFloat(amount.replace(/,/g, ''));
                        return `${((value / total) * 100).toFixed(0)}%`;
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value" // This is now the Dollar Amount
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}
                    // Show Dollar amount in tooltip
                    formatter={(value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* NEW: List of Exact Amounts per Coin */}
            <div style={styles.breakdownContainer}>
                <h4 style={styles.breakdownHeader}>Exact Distribution</h4>
                <div style={styles.breakdownList}>
                    {chartData.map((data, index) => (
                        <div key={index} style={styles.breakdownItem}>
                            <span style={{...styles.dot, backgroundColor: COLORS[index % COLORS.length]}}></span>
                            <span style={styles.coinName}>{data.name}</span>
                            <span style={styles.coinValue}>${data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

// 5. Professional CSS-in-JS Styles
const styles = {
  pageBackground: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#F0FDF4', 
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '550px',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #E5E7EB',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  heading: {
    margin: '0',
    color: '#0c9e81ff', 
    fontSize: '24px',
    fontWeight: '700',
  },
  subHeading: {
    margin: '8px 0 0 0',
    color: '#6B7280', 
    fontSize: '14px',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#374151',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #E5E7EB',
    color: '#1F2937',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#10B981', 
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#059669', 
    transform: 'translateY(-1px)',
  },
  chartSection: {
    marginTop: '30px',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E5E7EB',
    marginBottom: '25px',
  },
  chartHeader: {
    color: '#064E3B',
    margin: '0 0 5px 0',
  },
  chartSubText: {
    color: '#6B7280',
    fontSize: '14px',
    marginBottom: '20px',
  },
  // New Styles for the Amount Breakdown list
  breakdownContainer: {
    marginTop: '20px',
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    padding: '15px',
    border: '1px solid #E5E7EB',
  },
  breakdownHeader: {
    margin: '0 0 10px 0',
    fontSize: '14px',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  breakdownList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  breakdownItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  coinName: {
    flex: 1,
    textAlign: 'left',
    color: '#4B5563',
  },
  coinValue: {
    fontWeight: '600',
    color: '#064E3B',
  }
};

export default InvestmentPage;
