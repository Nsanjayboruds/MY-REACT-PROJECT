// src/pages/Signup.jsx
import { useState } from "react";

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        skills_offered: skillsOffered.split(",").map(skill => skill.trim()),
        skills_wanted: skillsWanted.split(",").map(skill => skill.trim()),
        created_at: new Date()
      });

      alert("Signup successful!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} className="w-full p-2 mb-2 border" />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-2 border" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-2 border" />
      <input type="text" placeholder="Skills you offer (comma separated)" onChange={e => setSkillsOffered(e.target.value)} className="w-full p-2 mb-2 border" />
      <input type="text" placeholder="Skills you want to learn (comma separated)" onChange={e => setSkillsWanted(e.target.value)} className="w-full p-2 mb-4 border" />
      <button onClick={handleSignup} className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
    </div>
  );
};

export default Signup;
