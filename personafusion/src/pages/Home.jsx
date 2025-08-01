import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-center">
        👤 PersonaFusion
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Create intelligent virtual personas with unique avatars, tones, and memories.
        Chat, explore, and build your AI-powered companions.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/create"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg font-medium shadow-lg transition"
        >
          ➕ Create Persona
        </Link>
        <Link
          to="/personas"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-medium shadow-lg transition"
        >
          🧠 View Personas
        </Link>
        <Link
          to="/chat"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-lg font-medium shadow-lg transition"
        >
          💬 Chat
        </Link>
      </div>
    </div>
  );
}
