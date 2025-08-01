export default function InsightsFeed() {
  const insights = [
    { title: "Productivity", message: "Your productivity peaks on Wednesdays." },
    { title: "Finance", message: "You spent 15% less this month than last." },
    { title: "Health", message: "You’ve walked 10,000+ steps on 5 days this week." },
    { title: "Focus", message: "You are most focused between 9 AM - 11 AM." },
  ];

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold dark:text-white">AI-Driven Insights</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
