import { useState } from "react";

export default function ManualOverride() {
  const [allocations, setAllocations] = useState([
    { coin: "BTC", percent: 0 },
    { coin: "ETH", percent: 0 },
    { coin: "SOL", percent: 0 }
  ]);

  const total = allocations.reduce((s, a) => s + a.percent, 0);
  const isValid = total === 100;

  const update = (i, value) => {
    const copy = [...allocations];
    copy[i].percent = Number(value);
    setAllocations(copy);
  };

  return (
    <div>
      <h3>Manual Investment Override</h3>

      {allocations.map((a, i) => (
        <div key={i}>
          <label>{a.coin}</label>
          <input
            type="number"
            value={a.percent}
            onChange={(e) => update(i, e.target.value)}
          />
        </div>
      ))}

      <p>Total Allocation: {total}%</p>

      {!isValid && <p style={{ color: "red" }}>Must total 100%</p>}

      <button disabled={!isValid}>Save Allocation</button>
    </div>
  );
}
