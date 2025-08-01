import { useUser } from '@clerk/clerk-react';

export default function UserProfilePanel() {
  const { user } = useUser();

  const history = JSON.parse(localStorage.getItem('lookupHistory') || '[]');
  const countryCounts = history.reduce((acc, entry) => {
    acc[entry.country] = (acc[entry.country] || 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-6 rounded-xl shadow-lg text-white text-center relative">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-2xl font-bold text-blue-600">
              {user.firstName?.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">{user.fullName}</h2>
        <p className="text-sm text-gray-200">{user.emailAddresses[0].emailAddress}</p>

        <div className="mt-4 text-left space-y-2">
          <p>🧮 <strong>Total Lookups:</strong> {history.length}</p>
          <p>🌍 <strong>Top Searched Countries:</strong></p>
          <ul className="ml-4 list-disc text-sm text-white">
            {topCountries.map(([country, count], i) => (
              <li key={i}>{country} ({count})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
