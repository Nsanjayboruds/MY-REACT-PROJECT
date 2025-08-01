export default function StatsCard({ title, value, icon, color = "bg-blue-100", textColor = "text-blue-800" }) {
  return (
    <div className={`p-4 rounded-xl shadow-md ${color}`}>
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold ${textColor}`}>{title}</h3>
        <div className={`text-2xl ${textColor}`}>{icon}</div>
      </div>
      <p className={`mt-4 text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}
