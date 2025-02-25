'use client';

import { useState } from 'react';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Common Buffer Overflow Vulnerabilities in C',
      question: 'What are buffer overflows, and how can they be exploited in C?',
      answer: 'Buffer overflows occur when a program writes beyond the allocated buffer, potentially overwriting adjacent memory. In C, functions like `strcpy` and `gets` can lead to these vulnerabilities. Exploitation involves overwriting return addresses or function pointers to execute malicious code.',
      date: 'October 26, 2023',
      categories: ['C Programming', 'Vulnerabilities', 'Security'],
    },
    {
      id: 2,
      title: 'Preventing SQL Injection Attacks',
      question: 'How can SQL injection vulnerabilities be prevented?',
      answer: 'SQL injection occurs when user input is directly inserted into SQL queries. Use parameterized queries or prepared statements to separate SQL code from user-supplied data. Input validation and sanitization are also crucial.',
      date: 'November 15, 2023',
      categories: ['SQL', 'Web Security', 'Database'],
    },
    {
      id: 3,
      title: "Understanding and Mitigating Cross-Site Scripting (XSS)",
      question: "What is XSS and what are the primary methods of preventing XSS attacks?",
      answer: "XSS attacks involve injecting malicious scripts into websites viewed by other users. To prevent XSS, always sanitize user inputs, use Content Security Policy (CSP), and encode outputs based on context.",
      date: 'December 5, 2023',
      categories: ['Web Security', 'JavaScript'],
    },
    {
      id: 4,
      title: "The Importance of Input Validation",
      question: "Why is input validation critical in software development?",
      answer: "Input validation ensures that user-supplied data conforms to the expected format, type, and length. It prevents various security vulnerabilities like SQL injection, XSS, and buffer overflows. Without proper validation, applications are susceptible to malicious input that can compromise system integrity.",
      date: "January 10, 2024",
      categories: ['Software Development', 'Security Best Practices'],
    },
    {
      id: 5,
      title: "Understanding OWASP Top 10 Vulnerabilities",
      question: "What are the OWASP Top 10, and why are they important?",
      answer: "The OWASP Top 10 is a standard awareness document for web application security. It represents a broad consensus about the most critical security risks to web applications. Understanding and addressing these vulnerabilities is crucial for developers to build secure applications.",
      date: "February 2, 2024",
      categories: ["Web Security", "OWASP", "Security Awareness"],
    },
    {
      id: 6,
      title: "What is a Denial-of-Service (DoS) attack?",
      question: "What is a Denial-of-Service (DoS) attack, and how does it impact systems?",
      answer: "A DoS attack floods a system with traffic or requests, making it unavailable to legitimate users. It disrupts services by overwhelming resources, leading to system crashes or slowdowns.",
      date: "March 1, 2024",
      categories: ["Network Security", "DoS/DDoS"],
    },
    {
      id: 7,
      title: "How does encryption protect data?",
      question: "How does encryption protect data, and what are common encryption methods?",
      answer: "Encryption converts data into an unreadable format using algorithms and keys. Common methods include AES, RSA, and DES. It ensures data confidentiality by making it inaccessible to unauthorized users.",
      date: "April 15, 2024",
      categories: ["Cryptography", "Data Security"],
    },
    {
      id: 8,
      title: "Understanding Phishing Attacks",
      question: "What are phishing attacks, and how can they be identified?",
      answer: "Phishing attacks involve deceptive emails or messages that trick users into revealing sensitive information. They often mimic legitimate sources. Identifying them requires vigilance, checking sender addresses, and verifying links.",
      date: "May 10, 2024",
      categories: ["Social Engineering", "Email Security"],
    },
    {
      id: 9,
      title: "The Role of Firewalls in Network Security",
      question: "What is the role of firewalls in network security?",
      answer: "Firewalls monitor and control network traffic based on predefined security rules. They act as a barrier between trusted and untrusted networks, preventing unauthorized access and malicious data.",
      date: "June 20, 2024",
      categories: ["Network Security", "Firewalls"],
    },
    {
      id: 10,
      title: "What is a Man-in-the-Middle (MitM) attack?",
      question: "What is a Man-in-the-Middle (MitM) attack, and how can it be prevented?",
      answer: "MitM attacks involve intercepting communication between two parties, allowing the attacker to eavesdrop or manipulate data. Using HTTPS, VPNs, and strong authentication methods can prevent MitM attacks.",
      date: "July 5, 2024",
      categories: ["Network Security", "MitM"],
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = blogPosts.filter((post) =>
      post.question.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-black mb-8">Cybersecurity Q&A Blog</h1>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search blog questions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border rounded-md text-black"
              />
            </div>

            {filteredPosts.map((post) => (
              <div key={post.id} className="mb-8 border-b pb-6">
                <h2 className="text-2xl font-bold text-black mb-3">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {post.date} | Categories: {post.categories.join(', ')}
                </p>
                <p className="font-bold text-black mb-2">{post.question}</p>
                <p className="mt-2 text-black">{post.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}