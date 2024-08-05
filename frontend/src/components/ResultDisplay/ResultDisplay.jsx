import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
  return (
    <div className="result-display">
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default ResultDisplay;
