import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const dummyTips = {
  health: [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Try to walk 10,000 steps a day for better health.",
    "Include more green vegetables in your meals.",
  ],
  finance: [
    "Track your monthly expenses to find saving opportunities.",
    "Invest regularly to take advantage of compounding interest.",
    "Build an emergency fund covering 3-6 months of expenses.",
  ],
  productivity: [
    "Use the Pomodoro technique: work 25 mins, break 5 mins.",
    "Prioritize tasks using the Eisenhower matrix.",
    "Take short breaks every hour to refresh your mind.",
  ],
};

export default function AIInsightsBot() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("health");
  const [tipIndex, setTipIndex] = useState(0);

  const tips = dummyTips[category];
  const currentTip = tips[tipIndex];

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Toggle AI Insights Bot"
      >
        <MessageSquare size={24} />
      </button>

      {/* Bot Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Insights Bot
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              aria-label="Close AI Insights Bot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Category Selector */}
          <div className="flex gap-2 mb-3">
            {["health", "finance", "productivity"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setTipIndex(0);
                }}
                className={`flex-1 px-3 py-1 rounded ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Tip Content */}
          <div className="flex-1 text-gray-900 dark:text-gray-100 mb-4">
            <p>{currentTip}</p>
          </div>

          {/* Next Tip Button */}
          <button
            onClick={nextTip}
            className="self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Next Tip
          </button>
        </div>
      )}
    </>
  );
}
