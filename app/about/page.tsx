'use client';

import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col overflow-x-hidden">
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

            {/* About Section */}
            <main className="flex-grow py-20 px-6 container mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6">About CyberPulse</h1>
                <p className="text-xl text-gray-300 mb-8">
                    CyberPulse is an advanced cybersecurity tool designed to help developers analyze and secure their C/C++ code effortlessly.
                    With a user-friendly interface, our platform ensures that detecting vulnerabilities and security flaws becomes a seamless process.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Comprehensive Code Analysis</h3>
                        <p className="text-gray-400">Scan your C/C++ code for vulnerabilities and security loopholes with precision.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                        <p className="text-gray-400">CyberPulse is designed for ease of use, making security analysis accessible to everyone.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Instant Vulnerability Detection</h3>
                        <p className="text-gray-400">Identify security weaknesses in real-time with our robust scanning engine.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Automated Patch Generation</h3>
                        <p className="text-gray-400">Get automated recommendations and patches for detected vulnerabilities.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">CWE & CVE Database</h3>
                        <p className="text-gray-400">Access a vast database of known security threats and mitigate them efficiently.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-6 mt-8 text-center">
                <p className="text-gray-400">&copy; 2025 CyberPulse. All rights reserved.</p>
            </footer>
        </div>
    );
}
