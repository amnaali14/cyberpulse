'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const [githubRepo, setGithubRepo] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const translateY = scrollY * 0.2;
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGitHubAnalysis = async () => {
    setIsLoading(true);
    // Simulate GitHub code fetching and analysis (replace with actual API call)
    setTimeout(() => {
      setAnalysisResults({
        vulnerabilities: [
          {
            id: 1,
            description: 'Buffer overflow in function X',
            severity: 'High',
            cwe: 'CWE-120',
            cve: 'CVE-2023-1234',
            codeSnippet: 'char buffer[10]; strcpy(buffer, userInput);',
            patch: 'Replace strcpy with strncpy and add bounds checking.',
            vulnerabilityType: 'Buffer Overflow',
          },
          {
            id: 2,
            description: 'SQL injection vulnerability',
            severity: 'Medium',
            cwe: 'CWE-89',
            cve: 'CVE-2023-5678',
            codeSnippet: "SELECT * FROM users WHERE username = '" + "userInput" + "'",
            patch: 'Use parameterized queries or prepared statements.',
            vulnerabilityType: 'SQL Injection',
          },
        ],
      });
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds of analysis
  };

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col overflow-x-hidden">
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/cyberpulse_logo1.png" alt="CyberPulse Logo" width={40} height={40} />
            <span className="text-xl font-semibold ml-2">CyberPulse</span>
          </Link>
        </div>
        <div>
          <Link href="/contact" className="mr-4 hover:text-gray-300 transition-colors duration-200">Contact Us</Link>
          <Link href="/blog" className="mr-4 hover:text-gray-300 transition-colors duration-200">Blog</Link>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">Login</Link>
        </div>
      </nav>

      <main className="flex-grow relative" ref={containerRef}>
        <header className="relative py-24 text-center bg-cover bg-center" style={{ backgroundImage: "url('/cybersecurity_background.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Detect Vulnerabilities Instantly</h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200">Analyze your code for security flaws with ease.</p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Enter GitHub Repository URL"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                className="bg-gray-800 p-3 rounded-l-md text-white w-96"
              />
              <button
                onClick={handleGitHubAnalysis}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-r-md"
              >
                Analyze
              </button>
            </div>
          </div>
        </header>

        <section className="container mx-auto py-12 relative z-10">
          {isLoading && <div className="text-center">Loading...</div>}

          {analysisResults && (
            <div className="mt-8">
              <h2 className="text-3xl font-semibold mb-6">Analysis Results</h2>
              {analysisResults.vulnerabilities.map((vulnerability) => (
                <div key={vulnerability.id} className="bg-gray-800 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-2">{vulnerability.description}</h3>
                  <p className="text-gray-400">Severity: {vulnerability.severity}</p>
                  <p className="text-gray-400">CWE: {vulnerability.cwe}</p>
                  <p className="text-gray-400">CVE: {vulnerability.cve}</p>
                  <p className="text-gray-400">Vulnerability Type: {vulnerability.vulnerabilityType}</p>
                  <pre className="bg-gray-700 p-2 rounded mt-2 overflow-x-auto">
                    {vulnerability.codeSnippet}
                  </pre>
                  <p className="text-gray-400 mt-2">Suggested Patch: {vulnerability.patch}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="container mx-auto py-12 relative z-10">
          <h2 className="text-3xl font-semibold mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">CWE/CVE Reports</h3>
              <p className="text-gray-400">View detailed reports for Common Weakness Enumerations (CWE) and Common Vulnerabilities and Exposures (CVE).</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Patch Generation</h3>
              <p className="text-gray-400">Automatically generate patches to fix detected vulnerabilities in your C/C++ code.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Severity Indication</h3>
              <p className="text-gray-400">Clearly indicate the severity of each vulnerability to prioritize remediation efforts.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Vulnerability Types</h3>
              <p className="text-gray-400">Correctly identify and display the different types of vulnerabilities found in your code.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 text-center mt-8">
        <p>
          <a href="https://www.cyberpulse.com" className="text-white hover:underline">
            &copy; 2025 CyberPulse
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}