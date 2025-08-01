// src/utils/spotifyAuth.js
import axios from "axios";

const clientId = "67d99a2fef5b4ff4858160e2d7f82a8d";
const redirectUri = "https://ce4c-103-100-215-21.ngrok-free.app/callback";

function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function getSpotifyLoginUrl() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(16);

  localStorage.setItem("code_verifier", codeVerifier);

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: "playlist-read-private",
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
}

export async function exchangeToken(code, codeVerifier) {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", codeVerifier);

  try {
    const res = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data.access_token;
  } catch (err) {
    console.error("🔴 Token exchange failed", err.response?.data || err);
    throw err;
  }
}
