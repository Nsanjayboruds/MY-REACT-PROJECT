import React, { useEffect, useState } from 'react';

export default function Viewproject() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const GITHUB_USERNAME = 'Nsanjayboruds';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const data = await res.json();
        setRepos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">My GitHub Projects</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div key={repo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition">
              {/* 👇 Project Image */}
              <img
                src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(repo.name)}`}
                alt={repo.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* 👇 Repo Info */}
              <h2 className="text-xl font-semibold text-orange-700 mb-2">{repo.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {repo.description || 'No description provided.'}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
