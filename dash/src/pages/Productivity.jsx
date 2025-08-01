import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";
import { TimerReset, CheckCircle2, AlarmClock } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
export default function Productivity() {
  const focusData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Focus Hours",
        data: [2, 3.5, 4, 5, 4.5, 3, 4],
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const tasksData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [4, 6, 5, 7, 3, 5, 8],
        borderColor: "#10b981",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    
    <div className="p-8 space-y-8 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Productivity Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Tasks Completed"
          value="62"
          icon={<CheckCircle2 />}
          color="bg-green-100 dark:bg-green-900"
          textColor="text-green-800 dark:text-green-300"
        />
        <StatsCard
          title="Focus Hours"
          value="25 hrs"
          icon={<TimerReset />}
          color="bg-blue-100 dark:bg-blue-900"
          textColor="text-blue-800 dark:text-blue-300"
        />
        <StatsCard
          title="Sessions Logged"
          value="14"
          icon={<AlarmClock />}
          color="bg-yellow-100 dark:bg-yellow-900"
          textColor="text-yellow-800 dark:text-yellow-300"
        />
      </div>

      {/* Productivity Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Weekly Focus Hours" data={focusData} options={chartOptions} />
        <ChartCard title="Weekly Tasks Completed" data={tasksData} options={chartOptions} />
      </div>
    </div>
  );
}
