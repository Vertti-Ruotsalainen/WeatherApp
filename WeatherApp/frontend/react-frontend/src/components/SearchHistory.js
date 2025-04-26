import React from 'react';
import './SearchHistory.css'; // luo myös tämän

export default function SearchHistory({ history, onSelect, onClear }) {
  if (history.length === 0) return null;
  return (
    <div className="search-history">
      <h4>Hakuhistoria</h4>
      <ul>
        {history.map((city, i) => (
          <li key={i}>
            <button onClick={() => onSelect(city)}>{city}</button>
          </li>
        ))}
      </ul>
      <button className="clear-history" onClick={onClear}>
        Tyhjennä historia
      </button>
    </div>
  );
}