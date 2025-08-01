import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NotificationsPanel({ isOpen, onClose, notifications }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg z-50 p-6 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Notifications</h2>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <X />
            </button>
          </div>

          <ul className="space-y-4">
            {notifications.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No new notifications.</p>
            )}
            {notifications.map((note, idx) => (
              <li
                key={idx}
                className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-200 shadow-sm"
              >
                {note}
              </li>
            ))}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
