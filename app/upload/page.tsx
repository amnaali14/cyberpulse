'use client';

import { useState, useRef } from 'react';
import axios from 'axios';

interface ClangResults {
    error?: string;
    results?: string | string[];
}

export default function UploadCode() {
    const [code, setCode] = useState('');
    const [results, setResults] = useState<ClangResults | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const uploadCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setCode(e.target.result as string);
                }
            };
            reader.readAsText(file);
        }
    };

    const analyzeCode = async () => {
        setIsLoading(true);
        setError('');
        setResults(null);

        try {
            const response = await axios.post('http://localhost:3000/api/analyze', { code });
            setResults(response.data);
        } catch (error: any) {
            console.error('Analysis error:', error);
            setError(error.response?.data?.error || 'An error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    };

    const clearResults = () => {
        setResults(null);
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Upload or Enter Your Code
                </h1>

                {/* File Upload */}
                <div className="mb-6">
                    <label htmlFor="fileInput" className="block text-md font-medium text-gray-700 mb-2">
                        Upload a File:
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="file"
                            id="fileInput"
                            accept=".txt, .c, .cpp, .h, .hpp, .js, .py, .java, .html"
                            onChange={uploadCode}
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <button
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Select File
                        </button>
                    </div>
                </div>

                {/* Code Input */}
                <div className="mb-6">
                    <label htmlFor="codeTextArea" className="block text-md font-medium text-gray-700 mb-2">
                        Or Enter Code Directly:
                    </label>
                    <textarea
                        id="codeTextArea"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows={8}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:outline-none text-sm font-mono"
                        placeholder="Paste your code here..."
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={analyzeCode}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Code'
                        )}
                    </button>
                    {results && (
                        <button
                            onClick={clearResults}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        >
                            Clear Results
                        </button>
                    )}
                </div>

                {/* Results */}
                {results && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                        {results.error ? (
                            <div className="text-red-500 font-medium">{results.error}</div>
                        ) : (
                            <>
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Clang Results:</h2>
                                <pre className="bg-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
                                    {results.results &&
                                        (Array.isArray(results.results)
                                            ? results.results.join('\n')
                                            : String(results.results))}
                                </pre>
                            </>
                        )}
                    </div>
                )}

                {/* Error Message */}
                {error && <p className="text-red-600 font-medium mt-4">{error}</p>}
            </div>
        </div>
    );
}