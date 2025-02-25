'use client';

import { useState, useRef } from 'react';

export default function UploadCode() {
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const analyzeCode = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Analysis error:', error);
      setResults({ error: 'An error occurred during analysis.' });
    }
  };

  const clearResults = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">Upload or Enter C Code</h1>

        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
            Upload File:
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".txt, .c, .cpp, .h, .hpp, .js, .py, .java, .html" 
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            ref={fileInputRef}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="codeTextArea" className="block text-sm font-medium text-gray-700 mb-2">
            Or Enter Code Directly:
          </label>
          <textarea
            id="codeTextArea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="border p-2 rounded w-full"
            placeholder="Enter your code here..."
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={analyzeCode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Analyze Code
          </button>
          {results && (
            <button
              onClick={clearResults}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Clear Results
            </button>
          )}
        </div>

        {results && (
          <div className="mt-6">
            {results.error ? (
              <div className="text-red-500">{results.error}</div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-2">Flawfinder Results:</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                  {results.flawfinder}
                </pre>
                <h2 className="text-lg font-semibold mt-4 mb-2">Clang Results:</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                  {results.clang}
                </pre>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}