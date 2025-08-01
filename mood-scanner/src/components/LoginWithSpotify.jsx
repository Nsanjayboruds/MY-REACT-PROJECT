// src/components/LoginWithSpotify.jsx
import { redirectToSpotifyLogin } from '../utils/spotifyAuth';

export default function LoginWithSpotify() {
  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={redirectToSpotifyLogin}
    >
      Login with Spotify
    </button>
  );
}
