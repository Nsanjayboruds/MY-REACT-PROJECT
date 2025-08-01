import { motion } from 'framer-motion';

export default function History({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">📜 Recent Lookups</h2>
      <div className="space-y-2">
        {history.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-600 p-3 rounded shadow"
          >
            <p><strong>{item.phone}</strong></p>
            <p className="text-sm">{item.location} - {item.country}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
