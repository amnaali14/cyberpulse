'use client';

import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return (
        <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/cyberpulse_logo1.png" alt="CyberPulse Logo" width={40} height={40} />
                        <span className="text-xl font-semibold ml-2">CyberPulse</span>
                    </Link>
                </div>
                <div className="flex space-x-6">
                    <Link href="/" className="hover:text-gray-300 transition-colors duration-200">Home</Link>
                    <Link href="/about" className="hover:text-gray-300 transition-colors duration-200">About</Link>
                    <Link href="/services" className="hover:text-gray-300 transition-colors duration-200">Services</Link>
                    <Link href="/contact" className="hover:text-gray-300 transition-colors duration-200">Contact</Link>
                    <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">Login</Link>
                </div>
            </nav>

            {/* Services Section */}
            <main className="container mx-auto py-12">
                <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Code Vulnerability Scanning</h2>
                        <p className="text-gray-400">Detect security flaws in your source code with our advanced vulnerability scanning tool.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Static Application Security Testing (SAST)</h2>
                        <p className="text-gray-400">Analyze your code for security vulnerabilities without executing it, using SAST technology.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Patch Recommendations</h2>
                        <p className="text-gray-400">Receive automated patch recommendations to fix vulnerabilities quickly.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Security Compliance Reports</h2>
                        <p className="text-gray-400">Generate detailed reports to meet security compliance standards like OWASP, CWE, and CVE.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Threat Intelligence Integration</h2>
                        <p className="text-gray-400">Stay ahead of cyber threats with real-time threat intelligence feeds.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Continuous Security Monitoring</h2>
                        <p className="text-gray-400">Monitor and track vulnerabilities continuously to maintain security posture.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-6 mt-8 text-center text-gray-400">
                <p>&copy; 2025 CyberPulse. All rights reserved.</p>
            </footer>
        </div>
    );
}
