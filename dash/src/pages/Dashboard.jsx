import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";
import ProgressBar from "../components/ProgressBar";
import { TrendingUp, CheckCircle, HeartPulse } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";

export default function Dashboard() {
  const productivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [3, 5, 4, 6, 2, 4, 7],
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const financeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Expenses ($)",
        data: [1200, 950, 1100, 1400, 1250],
        borderColor: "#10b981",
        tension: 0.4,
      },
    ],
  };

  const healthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Calories Burned",
        data: [2300, 2500, 2200, 2450],
        borderColor: "#ef4444",
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
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Completed Tasks"
          value="47"
          icon={<CheckCircle />}
          color="bg-green-100 dark:bg-green-900"
          textColor="text-green-800 dark:text-green-300"
        />
        <StatsCard
          title="Monthly Expenses"
          value="$1,250"
          icon={<TrendingUp />}
          color="bg-blue-100 dark:bg-blue-900"
          textColor="text-blue-800 dark:text-blue-300"
        />
        <StatsCard
          title="Calories Burned"
          value="2,345 kcal"
          icon={<HeartPulse />}
          color="bg-red-100 dark:bg-red-900"
          textColor="text-red-800 dark:text-red-300"
        />
      </div>

      {/* Insights Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Weekly Productivity"
          data={productivityData}
          options={chartOptions}
        />
        <ChartCard
          title="Monthly Expenses Trend"
          data={financeData}
          options={chartOptions}
        />
        <ChartCard
          title="Health & Calories Burned"
          data={healthData}
          options={chartOptions}
        />
      </div>

      {/* Progress Tracker / Milestones Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold dark:text-white">Progress Tracker</h2>
        <div className="space-y-4">
          <ProgressBar label="Health Goals" percentage={75} color="bg-red-500" />
          <ProgressBar label="Finance Savings" percentage={40} color="bg-green-500" />
          <ProgressBar label="Productivity Streak" percentage={90} color="bg-blue-500" />
        </div>
      </div>
    </div>
  );
}
