import { useNavigate } from "react-router-dom";
import { useMood } from "../context/MoodContext";
import { getSpotifyLoginUrl } from "../utils/spotifyAuth";

const moods = ["Happy", "Sad", "Energetic", "Calm", "Stressed"];

export default function Home() {
  const { setMood } = useMood();
  const navigate = useNavigate();

  const handleMoodSelect = (m) => {
    setMood(m);
    navigate("/recommendations");
  };

  const handleLogin = async () => {
    const url = await getSpotifyLoginUrl();
    window.location.href = url;
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">How are you feeling today?</h1>
      <div className="flex gap-4 flex-wrap mb-6">
        {moods.map((mood) => (
          <button key={mood} onClick={() => handleMoodSelect(mood)} className="px-4 py-2 bg-blue-600 text-white rounded">
            {mood}
          </button>
        ))}
      </div>
      <button onClick={handleLogin} className="px-4 py-2 bg-green-600 text-white rounded">
        Login with Spotify
      </button>
    </div>
  );
}
