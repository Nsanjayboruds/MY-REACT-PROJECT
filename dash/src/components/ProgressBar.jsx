export default function ProgressBar({ label, percentage, color = "bg-blue-500" }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium dark:text-gray-300">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className={`${color} h-3 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
