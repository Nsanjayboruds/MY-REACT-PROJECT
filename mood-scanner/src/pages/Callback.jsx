import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeToken } from "../utils/spotifyAuth";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!code || !codeVerifier) {
      console.error("Missing code or code_verifier");
      navigate("/");
      return;
    }

    const getAccessToken = async () => {
      try {
        const token = await exchangeToken(code, codeVerifier);
        localStorage.setItem("spotify_token", token);
        navigate("/recommendations");
      } catch (err) {
        console.error("Token exchange error:", err);
        navigate("/");
      }
    };

    getAccessToken();
  }, [navigate]);

  return <p>Logging you in via Spotify...</p>;
}
