import { useState, useEffect } from 'react';

export default function TopBar() {
  const [time, setTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(76);
  const [isCharging, setIsCharging] = useState(true); // Simulate charging

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTime(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fake charging animation (optional)
  useEffect(() => {
    if (isCharging && batteryLevel < 100) {
      const chargeInterval = setInterval(() => {
        setBatteryLevel((prev) => Math.min(prev + 1, 100));
      }, 800);
      return () => clearInterval(chargeInterval);
    }
  }, [isCharging, batteryLevel]);

  const getBatteryColor = () => {
    if (batteryLevel < 20) return 'bg-red-500';
    if (batteryLevel < 50) return 'bg-yellow-400';
    return 'bg-white';
  };

  return (
    <div className="fixed top-0 w-full h-6 bg-black/70 text-white text-xs flex justify-end items-center pr-4 z-50 space-x-4 font-mono">
      <div className="flex items-center space-x-1">
        <div className="relative w-6 h-3 border border-white rounded-sm overflow-hidden">
          <div
            className={`h-full transition-all ${getBatteryColor()}`}
            style={{ width: `${batteryLevel}%` }}
          ></div>
        </div>
        {isCharging && (
          <span className="text-green-400">⚡</span>
        )}
        <span>{batteryLevel}%</span>
      </div>
      <span>{time}</span>
    </div>
  );
}
