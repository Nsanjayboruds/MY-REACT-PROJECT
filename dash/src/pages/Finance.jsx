import ChartCard from "../components/ChartCard";
import { financeData } from "../services/dataService";
import AnimatedPage from "../components/AnimatedPage";

export default function Finance() {
  const options = { responsive: true };

  return (
    
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-900 min-h-screen transition-colors">
      <ChartCard title="Monthly Expenses" data={financeData} options={options} />
    </div>
  );
}
