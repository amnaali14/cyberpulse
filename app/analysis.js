// pages/analysis.js
import { useState } from 'react';

export default function AnalysisPage() {
  const [codebasePath, setCodebasePath] = useState('');
  const [results, setResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codebasePath }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('An error occurred while running the analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Static Code Analysis</h1>
      <div>
        <label htmlFor="codebasePath">Codebase Path:</label>
        <input
          id="codebasePath"
          type="text"
          value={codebasePath}
          onChange={(e) => setCodebasePath(e.target.value)}
          placeholder="Enter path to codebase"
        />
      </div>
      <button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Run Analysis'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results && (
        <div>
          <h2>Analysis Results:</h2>
          <pre>{results}</pre>
        </div>
      )}
    </div>
  );
}