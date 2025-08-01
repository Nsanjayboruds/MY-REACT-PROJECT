import { useState } from 'react';

export default function BrowserApp() {
  const [activeTab, setActiveTab] = useState('https://www.fake-google.com');

  return (
    <div className="flex flex-col h-full font-sans bg-gray-50">
      {/* Fake Tabs */}
      <div className="flex bg-gray-300 text-sm">
        <div
          className={`px-4 py-2 cursor-pointer ${activeTab === 'https://www.fake-google.com' ? 'bg-white' : ''}`}
          onClick={() => setActiveTab('https://www.fake-google.com')}
        >
          Google
        </div>
        <div
          className={`px-4 py-2 cursor-pointer ${activeTab === 'https://www.youtube.com' ? 'bg-white' : ''}`}
          onClick={() => setActiveTab('https://www.youtube.com')}
        >
          YouTube
        </div>
      </div>

      {/* Fake Address Bar */}
      <div className="bg-gray-200 px-4 py-2">
        <input
          type="text"
          value={activeTab}
          readOnly
          className="w-full rounded-md px-2 py-1 text-xs bg-gray-100 border border-gray-300"
        />
      </div>

      {/* Fake Page Content */}
      <div className="flex-1 p-6 bg-white overflow-auto">
        {activeTab === 'https://www.fake-google.com' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-700">Google</h1>
            <input
              type="text"
              placeholder="Search Google..."
              className="mt-6 p-2 w-1/2 border rounded-md border-gray-300"
            />
            <p className="mt-8 text-sm text-gray-500">Fake Search Engine for UI Demo Only.</p>
          </div>
        )}

        {activeTab === 'https://www.youtube.com' && (
          <div>
            <h1 className="text-3xl font-bold text-red-500">YouTube</h1>
            <div className="mt-6">
              <p className="text-sm text-gray-500">Trending Videos:</p>
              <ul className="list-disc ml-4 text-gray-700">
                <li>React Tutorial 2025</li>
                <li>MacOS in React Tailwind Demo</li>
                <li>Top 10 Fake OS Projects</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
