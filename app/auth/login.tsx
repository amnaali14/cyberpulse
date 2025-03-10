"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await signIn("credentials", { redirect: false, email, password });
    if (!result?.error) {
      window.location.href = "/dashboard";
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block mb-4 p-2 border" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}
