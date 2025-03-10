"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Registered successfully!");
      window.location.href = "/auth/login";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block mb-4 p-2 border" />
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </div>
  );
}
