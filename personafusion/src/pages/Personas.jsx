import { useEffect, useState } from "react";
import axios from "axios";

export default function Personas() {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/personas");
        setPersonas(res.data);
      } catch (err) {
        console.error("❌ Failed to load personas:", err);
      }
    };

    fetchPersonas();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🧠 Your Personas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <div
            key={persona._id}
            className="bg-gray-900 p-4 rounded shadow-md flex items-center gap-4"
          >
            <img
              src={persona.avatarUrl}
              alt={persona.name}
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold">{persona.name}</h2>
              <p className="text-sm text-gray-400">🗣️ Tone: {persona.tone}</p>
              <p className="text-sm text-gray-300 mt-1">
                📖 {persona.backstory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
