import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

export default function SafariApp() {
  const [currentTab, setCurrentTab] = useState('https://www.apple.com');

  const tabs = [
    { name: 'Apple', url: 'https://www.apple.com' },
    { name: 'OpenAI', url: 'https://www.openai.com' },
    { name: 'ChatGPT', url: 'https://chat.openai.com' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans border rounded-md overflow-hidden shadow text-xs">
      {/* Tabs */}
      <div className="flex space-x-2 px-2 py-1 bg-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.url}
            onClick={() => setCurrentTab(tab.url)}
            className={`px-3 py-1 rounded-t-md transition ${
              currentTab === tab.url
                ? 'bg-white font-medium shadow'
                : 'hover:bg-gray-300'
            } cursor-pointer`}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 py-1 bg-gray-100 border-b space-x-1">
        <button className="p-1 rounded bg-gray-300" title="Back">
          <ChevronLeft size={14} />
        </button>
        <button className="p-1 rounded bg-gray-300" title="Forward">
          <ChevronRight size={14} />
        </button>
        <button className="p-1 rounded bg-gray-300" title="Refresh">
          <RefreshCw size={14} />
        </button>
        <input
          type="text"
          value={currentTab}
          readOnly
          className="flex-1 px-2 py-1 bg-white border rounded text-xs"
        />
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6 overflow-auto bg-white relative">
        <AnimatePresence mode="wait">
          {currentTab === 'https://www.apple.com' && (
            <motion.div
              key="apple"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 p-6"
            >
              <h1 className="text-2xl font-bold text-gray-700">🍎 Apple</h1>
              <p className="mt-4 text-gray-500">Welcome to Apple's fake homepage.</p>
            </motion.div>
          )}
          {currentTab === 'https://www.openai.com' && (
            <motion.div
              key="openai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 p-6"
            >
              <h1 className="text-2xl font-bold text-gray-700">🤖 OpenAI</h1>
              <p className="mt-4 text-gray-500">Welcome to OpenAI's fake homepage.</p>
            </motion.div>
          )}
          {currentTab === 'https://chat.openai.com' && (
            <motion.div
              key="chatgpt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 p-6"
            >
              <h1 className="text-2xl font-bold text-gray-700">💬 ChatGPT</h1>
              <p className="mt-4 text-gray-500">Fake ChatGPT preview in Safari.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
