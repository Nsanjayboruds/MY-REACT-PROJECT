import { useEffect, useState, useRef } from "react";
import { Moon, Sun, Bell } from "lucide-react";
import UserProfile from "./UserProfile";
import NotificationsPanel from "./NotificationsPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef();

  const notifications = [
    "Your health score dropped by 10%.",
    "New finance tip available: Cut subscriptions.",
    "You completed your productivity goal!",
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold">Personal Insights Dashboard</h1>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => setShowNotifications(true)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <Bell size={20} />
        </button>

        <button
          onClick={() => setShowProfile(!showProfile)}
          className="rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600"
        >
          <img
            src="https://avatars.githubusercontent.com/u/180739822?v=4"
            alt="User"
            className="w-10 h-10 object-cover"
          />
        </button>

        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 right-0 z-50"
            >
              <UserProfile />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />
    </nav>
  );
}
