import { useState } from "react";
import axios from "axios";

export default function CreatePersona() {
  const [name, setName] = useState("");
  const [tone, setTone] = useState("");
  const [backstory, setBackstory] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    if (!name.trim() || !tone.trim() || !backstory.trim()) {
      return alert("Please fill all fields");
    }

    const avatarUrl = `https://robohash.org/${encodeURIComponent(name)}.png`;

    try {
      await axios.post("http://localhost:5000/api/personas", {
        name,
        tone,
        backstory,
        avatarUrl,
      });
      setMessage("✅ Persona saved!");
      setName("");
      setTone("");
      setBackstory("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save persona.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Create Persona</h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          className="p-2 rounded bg-gray-800 text-white"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 rounded bg-gray-800 text-white"
          placeholder="Tone (friendly, sarcastic...)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />
        <textarea
          className="p-2 rounded bg-gray-800 text-white"
          placeholder="Backstory"
          rows={5}
          value={backstory}
          onChange={(e) => setBackstory(e.target.value)}
        ></textarea>

        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={handleCreate}
        >
          Save Persona
        </button>

        {message && <p className="text-sm text-gray-400 mt-2">{message}</p>}
      </div>

      {name && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Generated Avatar:</h2>
          <img
            src={`https://robohash.org/${encodeURIComponent(name)}.png`}
            alt="Avatar"
            className="w-24 h-24 rounded-full border"
          />
        </div>
      )}
    </div>
  );
}
