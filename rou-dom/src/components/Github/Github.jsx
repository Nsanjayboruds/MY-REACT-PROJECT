import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
  const data = useLoaderData();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-orange-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={data.avatar_url}
          alt="GitHub Avatar"
          className="w-32 h-32 rounded-full mx-auto shadow-md border-4 border-orange-200 mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">{data.name || data.login}</h1>
        <p className="text-gray-500 mb-2">@{data.login}</p>
        <p className="text-gray-600 text-sm mb-4">
          {data.bio || "No bio available."}
        </p>
        <div className="flex justify-around text-gray-700 font-medium text-sm">
          <span>Followers: <strong>{data.followers}</strong></span>
          <span>Following: <strong>{data.following}</strong></span>
        </div>
        <a
          href={data.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-6 px-6 py-2 text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default Github;
// ✅ Export this loader
export const githubInfoLoader = async () => {
  const res = await fetch('https://api.github.com/users/Nsanjayboruds ');
  if (!res.ok) throw new Error("Failed to load GitHub data");
  return res.json();
};