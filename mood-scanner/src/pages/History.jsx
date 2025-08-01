import { useEffect } from 'react';
import { useMood } from '../context/MoodContext';

export default function History() {
  const { history } = useMood();

  useEffect(() => {
    const stored = localStorage.getItem('moodHistory');
    if (stored) {
      console.log('Mood History:', JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mood History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((entry, index) => (
            <li key={index} className="border p-2 rounded shadow">
              {entry.date}: {entry.mood}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
