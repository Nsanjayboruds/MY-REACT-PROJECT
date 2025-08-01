// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    setMessage("❌ Please enter both email and password.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: email.trim(),
      password: password.trim(),
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage("❌ " + response.data.message);
    }
  } catch (err) {
    console.error(err);
    setMessage("❌ " + (err.response?.data?.message || "Login failed"));
  }
};


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Log In</h1>
        <p className="text-gray-400 mb-6">
          Log in to your PersonaFusion account to get started!
        </p>

        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Log In
        </button>

        {message && <p className="text-sm text-red-400 mt-4">{message}</p>}

        <p className="mt-6 text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-400 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
