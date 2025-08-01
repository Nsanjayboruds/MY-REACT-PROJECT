import InsightsFeed from "../components/InsightsFeed";
import AnimatedPage from "../components/AnimatedPage";
export default function InsightsPage() {
  return (
    
    <div className="p-8 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">AI Insights Feed</h2>
      <InsightsFeed />
    </div>
  );
}
