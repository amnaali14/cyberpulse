'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LoginFormValues {
  username: string;
}

const LoginPage = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({ username: '' });
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formValues.username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard'; // Or use next/router
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans min-h-screen flex">
      <div className="w-1/2 flex justify-center items-center">
        <div className="p-8">
          <h1 className="text-5xl font-bold mb-4">KEEP</h1>
          <h1 className="text-5xl font-bold mb-4">YOUR</h1>
          <h1 className="text-5xl font-bold mb-4">CODE</h1>
          <h1 className="text-5xl font-bold">SECURE</h1>
          <p className="mt-8 text-lg">
            Analyze vulnerabilities in your C/C++ code
        | Get CVE/CWE insights
          </p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-gray-900 rounded-lg p-8 w-96">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign in</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="USERNAME / EMAIL"
              className="w-full bg-gray-800 rounded-md p-3 mb-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"  
              placeholder="PASSWORD"
              className="w-full bg-gray-800 rounded-md p-3 mb-6 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'NEXT'}
            </button>
          </form>
      
      
<p className="mt-4 text-center">
    Don't have an account? <Link href="/register" className="text-blue-500">Register here</Link>
</p>
          <div className="text-center mt-6">
            <Link href="#" className="text-gray-400 hover:text-gray-300">Need help signing in?</Link>
          </div>

          <div className="mt-8 text-center text-gray-400">
            <p className="mb-2">
              By continuing, you agree to our <Link href="#" className="text-blue-500 hover:text-blue-700">terms</Link>.
            </p>
            <p>
              <Link href="#" className="text-blue-500 hover:text-blue-700">Sign Up</Link> for a free trial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;