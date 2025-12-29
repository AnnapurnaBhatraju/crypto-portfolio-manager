// import { useState } from "react";

// export default function ManualOverride() {
//   const [allocations, setAllocations] = useState([
//     { coin: "BTC", percent: 0 },
//     { coin: "ETH", percent: 0 },
//     { coin: "SOL", percent: 0 }
//   ]);

//   const total = allocations.reduce((s, a) => s + a.percent, 0);
//   const isValid = total === 100;

//   const update = (i, value) => {
//     const copy = [...allocations];
//     copy[i].percent = Number(value);
//     setAllocations(copy);
//   };

//   return (
//     <div>
//       <h3>Manual Investment Override</h3>

//       {allocations.map((a, i) => (
//         <div key={i}>
//           <label>{a.coin}</label>
//           <input
//             type="number"
//             value={a.percent}
//             onChange={(e) => update(i, e.target.value)}
//           />
//         </div>
//       ))}

//       <p>Total Allocation: {total}%</p>

//       {!isValid && <p style={{ color: "red" }}>Must total 100%</p>}

//       <button disabled={!isValid}>Save Allocation</button>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';

const ManualOverride = () => {
  const [budget, setBudget] = useState(5000);
  const [mix, setMix] = useState([]);

  const handleGenerate = async () => {
    try {
      // Ensure this URL matches your backend port (usually 8000)
      const res = await axios.post('http://127.0.0.1:8000/api/portfolio/generate-mix', {
        budget: parseFloat(budget),
        include_warning_zone: true
      });
      setMix(res.data);
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to connect to backend. Make sure it's running on port 8000.");
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>Manual Strategy Override</h2>
      <label>Investment Budget ($): </label>
      <input 
        type="number" 
        value={budget} 
        onChange={(e) => setBudget(e.target.value)} 
      />
      <button onClick={handleGenerate} style={{ marginLeft: '10px' }}>Generate Mix</button>

      {mix.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Suggested Mix (Includes Warning Zone):</h4>
          <ul>
            {mix.map((item, idx) => (
              <li key={idx}>
                <strong>{item.Coin}</strong>: {item.Zone} — ${item.Allocation_USD} ({item.Units} units)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManualOverride;