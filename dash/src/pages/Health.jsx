import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";
import { HeartPulse, Footprints, BedDouble } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
export default function Health() {
  const stepsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps Walked",
        data: [5000, 7000, 6500, 8000, 9000, 7500, 8200],
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Slept",
        data: [6.5, 7, 5.5, 6, 7.5, 8, 6],
        borderColor: "#8b5cf6",
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
      {/* Health Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Steps Walked"
          value="8,200"
          icon={<Footprints />}
          color="bg-blue-100 dark:bg-blue-900"
          textColor="text-blue-800 dark:text-blue-300"
        />
        <StatsCard
          title="Calories Burned"
          value="2,300 kcal"
          icon={<HeartPulse />}
          color="bg-red-100 dark:bg-red-900"
          textColor="text-red-800 dark:text-red-300"
        />
        <StatsCard
          title="Avg. Hours Slept"
          value="6.8 hrs"
          icon={<BedDouble />}
          color="bg-purple-100 dark:bg-purple-900"
          textColor="text-purple-800 dark:text-purple-300"
        />
      </div>

      {/* Health Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Weekly Steps" data={stepsData} options={chartOptions} />
        <ChartCard title="Weekly Sleep" data={sleepData} options={chartOptions} />
      </div>
    </div>
  );
}
