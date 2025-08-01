import { useState } from 'react';

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (loading) return;
    setLoading(true);

    if (password === 'mac123') {
      new Audio('/sounds/login.mp3').play();
      setTimeout(() => {
        onLogin();
      }, 800);
    } else {
      new Audio('/sounds/error.mp3').play();
      setError('Incorrect password');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-80 text-white"
      style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/e6/75/dd/e675dd3f8c7f6d551f4aea8f5661ba2c.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black/50 p-6 rounded-lg text-center space-y-4">
        <img src="/icons/apple.png" className="w-16 h-16 rounded-full mx-auto" />
        <h1 className="text-lg font-semibold">Login MAC</h1>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white rounded w-64 text-center"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`px-4 py-2 rounded transition ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </div>
  );
}
