import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-green-700 ${
      location.pathname === path ? "bg-green-600" : "bg-gray-800"
    }`;

  return (
    <nav className="bg-black text-white p-4 flex gap-4 shadow-md">
      <Link to="/" className={linkClass("/")}>
        🏠 Home
      </Link>
      <Link to="/create" className={linkClass("/create")}>
        ➕ Create Persona
      </Link>
      <Link to="/personas" className={linkClass("/personas")}>
        🧠 View Personas
      </Link>
      <Link to="/chat" className={linkClass("/chat")}>
        💬 Chat
      </Link>
    </nav>
  );
}
