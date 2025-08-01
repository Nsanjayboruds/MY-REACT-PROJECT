import { useState } from 'react';
import '../styles/InputError.css';

function InputForm({ onTrack }) {
  const [number, setNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!number.trim()) {
      setError('⚠️ Please enter a mobile number');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setError('');
      }, 1000);
      return;
    }

    setError('');
    onTrack(`${countryCode}${number.trim()}`);
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="bg-white text-black rounded px-2 py-2"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+61">🇦🇺 +61</option>
          <option value="+81">🇯🇵 +81</option>
          
        </select>

        <input
          type="text"
          placeholder="Enter mobile number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className={`flex-grow px-4 py-2 rounded text-white bg-transparent border ${
            shake ? 'shake border-red-500' : 'border-gray-500'
          }`}
        />

        <button
          type="submit"
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100"
        >
          Track
        </button>
      </form>

      {error && (
        <p className="text-red-300 text-sm animate-pulse mb-4">{error}</p>
      )}
    </>
  );
}

export default InputForm;
