import { Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function InsightsPanel({ history }) {
  const countryCount = {};
  const carrierCount = {};

  history.forEach(entry => {
    const country = entry.country || 'Unknown';
    const carrier = entry.carrier || 'Unknown';

    countryCount[country] = (countryCount[country] || 0) + 1;
    carrierCount[carrier] = (carrierCount[carrier] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(countryCount),
    datasets: [{
      label: 'Country Lookups',
      data: Object.values(countryCount),
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
    }],
  };

  const pieData = {
    labels: Object.keys(carrierCount),
    datasets: [{
      label: 'Carrier Distribution',
      data: Object.values(carrierCount),
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#EC4899',
      ],
    }],
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">📊 Insights Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-md font-semibold mb-2">🌍 Country Lookups</h3>
          <Bar data={barData} />
        </div>

       
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-md font-semibold mb-2">📡 Carrier Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>

    
      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">🧾 Recent Lookups</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-1">📱 Number</th>
              <th className="py-1">📍 Location</th>
              <th className="py-1">🌐 Country</th>
              <th className="py-1">⏱ Time</th>
            </tr>
          </thead>
          <tbody>
            {history.slice(0, 5).map((entry, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="py-1">{entry.phone}</td>
                <td className="py-1">{entry.location}</td>
                <td className="py-1">{entry.country}</td>
                <td className="py-1">{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsightsPanel;
