import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("signup"); // 'signup' or 'login'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !password || (mode === "signup" && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {
          name,
          email,
          skills_offered: skillsOffered.split(",").map((s) => s.trim()).filter(Boolean),
          skills_wanted: skillsWanted.split(",").map((s) => s.trim()).filter(Boolean),
          created_at: new Date(),
        });

        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      {/* Toggle buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("login")}
        >
          Log In
        </button>
      </div>

      {/* Form Heading */}
      <h2 className="text-xl font-semibold text-center mb-4">
        {mode === "signup" ? "Create your account" : "Log in to your account"}
      </h2>

      {/* Signup-only fields */}
      {mode === "signup" && (
        <>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Skills you offer (comma separated)"
            value={skillsOffered}
            onChange={(e) => setSkillsOffered(e.target.value)}
            className="w-full p-2 mb-2 border"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Skills you want to learn (comma separated)"
            value={skillsWanted}
            onChange={(e) => setSkillsWanted(e.target.value)}
            className="w-full p-2 mb-2 border"
            disabled={loading}
          />
        </>
      )}

      {/* Shared fields */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border"
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border"
        disabled={loading}
      />

      {/* Submit button */}
      <button
        onClick={handleAuth}
        disabled={loading}
        className={`w-full py-2 rounded mb-2 text-white ${
          loading ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        {loading
          ? "Please wait..."
          : mode === "signup"
          ? "Sign Up"
          : "Log In"}
      </button>
    </div>
  );
};

export default Auth;
