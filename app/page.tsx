'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col overflow-x-hidden">
            {/* Navigation Bar */}
            <nav className="bg-gray-900 p-6 flex justify-between items-center shadow-md">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/cyberpulse_logo1.png" alt="CyberPulse Logo" width={50} height={50} />
                        <span className="text-2xl font-bold ml-3">CyberPulse</span>
                    </Link>
                </div>
                <div className="flex space-x-8 text-lg font-semibold">
                    <Link href="/" className="hover:text-gray-300 transition-transform transform hover:scale-110">Home</Link>
                    <Link href="/about" className="hover:text-gray-300 transition-transform transform hover:scale-110">About</Link>
                    <Link href="/services" className="hover:text-gray-300 transition-transform transform hover:scale-110">Services</Link>
                    <Link href="/contact" className="hover:text-gray-300 transition-transform transform hover:scale-110">Contact</Link>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-lg transition-transform transform hover:scale-110">Logout</button>
                    ) : (
                        <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg transition-transform transform hover:scale-110">Login</Link>
                    )}
                </div>
            </nav>
            
            {/* Main Content */}
            <main className="flex-grow relative" ref={containerRef}>
                {/* Header Section */}
                <header 
                    className="relative py-32 text-left pl-12 bg-cover bg-center"
                    style={{ backgroundImage: "url('/cybersecurity_background.jpg')" }}
                >
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1 }}
                        className="relative z-10"
                    >
                        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white tracking-wide">
                            Detect Vulnerabilities Instantly
                        </h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 1.2 }}
                            className="text-2xl md:text-3xl mb-10 text-gray-300"
                        >
                            Analyze your code for security flaws with ease.
                        </motion.p>
                        <div className="flex space-x-6">
                            <motion.a 
                                href="/upload" 
                                whileHover={{ scale: 1.1 }}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg"
                            >
                              Clang Analysis
                            </motion.a>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => window.location.href = 'http://localhost:9000'}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg"
                            >
                              SonarQube Analysis
                            </motion.button>
                        </div>
                    </motion.div>
                </header>
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-900 p-6 mt-8">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center">
                        <Image src="/cyberpulse_logo1.png" alt="CyberPulse Logo" width={50} height={50} />
                        <span className="text-2xl font-semibold ml-3">CyberPulse</span>
                    </div>
                    <div className="flex space-x-8 text-gray-400 text-lg">
                        <Link href="/privacy" className="hover:text-gray-200">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gray-200">Terms & Conditions</Link>
                        <Link href="/cookies" className="hover:text-gray-200">Cookies Policy</Link>
                    </div>
                </div>
                <div className="text-center mt-4 text-gray-400">
                    <p>&copy; 2025 CyberPulse. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}