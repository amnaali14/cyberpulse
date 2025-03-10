'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
                <Link href="/" className="flex items-center">
                    <Image src="/cyberpulse_logo1.png" alt="CyberPulse Logo" width={40} height={40} />
                    <span className="text-xl font-semibold ml-2">CyberPulse</span>
                </Link>
                <div className="flex space-x-6">
                    <Link href="/" className="hover:text-gray-300 transition-colors duration-200">Home</Link>
                    <Link href="/about" className="hover:text-gray-300 transition-colors duration-200">About</Link>
                    <Link href="/services" className="hover:text-gray-300 transition-colors duration-200">Services</Link>
                    <Link href="/contact" className="text-blue-500 font-semibold">Contact</Link>
                    <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">Login</Link>
                </div>
            </nav>

            {/* Contact Section */}
            <main className="flex-grow flex flex-col justify-center items-center p-6">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-gray-300 mb-8">Have questions or need assistance? Fill out the form below, and we will get back to you soon.</p>
                
                {submitted ? (
                    <p className="text-green-500">Thank you! Your message has been sent.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 text-white rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 text-white rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 text-white rounded h-32"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded w-full">
                            Send Message
                        </button>
                    </form>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-6 text-center text-gray-400">
                <p>&copy; 2025 CyberPulse. All rights reserved.</p>
            </footer>
        </div>
    );
}
