import { useEffect, useState } from "react";
import axios from "axios";
import { useMood } from "../context/MoodContext";

export default function Recommendations() {
  const { mood } = useMood();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");

    if (!token) return;

    const fetchPlaylists = async () => {
      try {
        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=playlist&limit=6`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlaylists(res.data.playlists.items || []);
      } catch (err) {
        console.error("Failed to fetch playlists", err);
      }
    };

    if (mood) fetchPlaylists();
  }, [mood]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mood: {mood}</h2>
      {playlists.length === 0 ? (
        <p>No playlists found or not logged in.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map((p) => (
            <a key={p.id} href={p.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <div className="bg-gray-100 p-4 rounded shadow">
                <img src={p.images[0]?.url} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />
                <p className="font-semibold">{p.name}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
