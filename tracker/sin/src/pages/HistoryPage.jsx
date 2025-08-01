function HistoryPage() {
  const history = JSON.parse(localStorage.getItem('lookupHistory') || '[]');

  return (
    <div className="bg-white/10 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📜 Lookup History</h2>
      {history.length === 0 ? (
        <p>No lookups yet.</p>
      ) : (
        <ul className="space-y-2 animate-fade-in">
          {history.map((entry, i) => (
            <li key={i} className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-600 p-3 rounded shadow-md">
              <p><strong>{entry.phone}</strong> — {entry.location} | {entry.country}</p>
              <p className="text-xs text-gray-300">⏱ {entry.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryPage;
