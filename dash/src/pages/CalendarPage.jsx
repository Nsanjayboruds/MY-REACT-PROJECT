import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; // For custom styling

const events = [
  { date: '2025-07-20', label: 'Pay Credit Card', category: 'finance' },
  { date: '2025-07-21', label: 'Run 5km', category: 'health' },
  { date: '2025-07-22', label: 'Complete Project X', category: 'productivity' },
  { date: '2025-07-23', label: 'Yoga Class', category: 'health' },
  { date: '2025-07-24', label: 'Submit Report', category: 'finance' },
];

const categoryColors = {
  finance: 'bg-green-400',
  health: 'bg-red-400',
  productivity: 'bg-blue-400',
};

export default function CalendarPage() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="p-8 space-y-8 dark:text-white">
      <h1 className="text-2xl font-semibold">Calendar</h1>

      <div className="flex gap-2">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400"></span>Finance</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400"></span>Health</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-400"></span>Productivity</span>
      </div>

      <Calendar
        onChange={setValue}
        value={value}
        tileContent={({ date }) => {
          const event = events.find(
            (e) => new Date(e.date).toDateString() === date.toDateString()
          );
          return event ? (
            <div
              className={`w-2 h-2 rounded-full mx-auto mt-1 ${categoryColors[event.category]}`}
              title={event.label}
            ></div>
          ) : null;
        }}
        className="rounded-lg overflow-hidden shadow-lg calendar dark:bg-gray-800"
      />
    </div>
  );
}
