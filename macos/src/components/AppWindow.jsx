import { motion } from 'framer-motion';

export default function AppWindow({ app, onClose, bringToFront }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={() => bringToFront(app.id)}
      className="absolute top-24 left-24 w-96 h-64 bg-white rounded-xl shadow-md flex flex-col z-40"
      whileTap={{ scale: 1.03 }}
    >
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center rounded-t-xl cursor-grab">
        <span>{app.name}</span>
        <button onClick={() => onClose(app.id)} className="text-white">×</button>
      </div>
      <div className="flex-grow overflow-auto">{app.content}</div>
    </motion.div>
  );
}
