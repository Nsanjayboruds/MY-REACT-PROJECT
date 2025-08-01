// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");            // ✅ Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setMessage("✅ Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Signup failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
        <p className="text-gray-400 mb-6">
          Create your PersonaFusion account to get started!
        </p>

        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {message && <p className="text-sm text-red-400 mt-4">{message}</p>}

        <p className="mt-6 text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
