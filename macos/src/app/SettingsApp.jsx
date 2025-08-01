import { useState } from 'react';

export default function SettingsApp() {
  const [soundOn, setSoundOn] = useState(true);

  return (
    <div className="p-4 font-sans">
      <h1 className="font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">💡 Appearance:</p>
          <p className="text-gray-600">Light / Dark (disabled)</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold">🔊 Sound:</p>
          <button
            onClick={() => setSoundOn(!soundOn)}
            className={`px-4 py-1 rounded-full text-white transition ${
              soundOn ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {soundOn ? 'On' : 'Off'}
          </button>
        </div>

        <div>
          <p className="font-semibold">🌐 Network:</p>
          <p className="text-gray-600">Connected</p>
        </div>
      </div>
    </div>
  );
}
