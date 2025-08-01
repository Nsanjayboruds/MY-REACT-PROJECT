import { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import AppWindow from './components/AppWindow';
import BrowserApp from './app/BrowserApp';
import VSCodeApp from './app/VSCodeApp';
import TerminalApp from './app/TerminalApp';
import SettingsApp from './app/SettingsApp';
import SafariApp from './app/SafariApp';
import LoginScreen from './components/LoginScreen'; // ✅ Import it properly!

const appsData = [
  { id: 'safari', name: 'Safari', icon: '/icons/safari.png', content: <SafariApp /> },
  { id: 'browser', name: 'Browser', icon: '/icons/brave.png', content: <BrowserApp /> },
  { id: 'vscode', name: 'VS Code', icon: '/icons/vscode.png', content: <VSCodeApp /> },
  { id: 'terminal', name: 'Terminal', icon: '/icons/terminal.png', content: <TerminalApp /> },
  { id: 'settings', name: 'Settings', icon: '/icons/setting.png', content: <SettingsApp /> },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [openApps, setOpenApps] = useState([]);
  const [desktopItems, setDesktopItems] = useState([
    { id: 1, name: 'Projects', x: 20, y: 60, editing: false },
  ]);
  const [zOrder, setZOrder] = useState(100);
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const playClickSound = () => new Audio('/sounds/select.wav').play();
  const playSafariSound = () => new Audio('/sounds/safari.mp3').play();

  const launchApp = (id) => {
    playClickSound();
    if (id === 'safari') playSafariSound();
    if (!openApps.find((a) => a.id === id)) {
      const app = appsData.find((a) => a.id === id);
      setOpenApps([...openApps, { ...app, zIndex: zOrder }]);
      setZOrder((prev) => prev + 1);
    }
  };

  const bringToFront = (id) => {
    setOpenApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, zIndex: zOrder } : app))
    );
    setZOrder((prev) => prev + 1);
  };

  const closeApp = (id) => setOpenApps(openApps.filter((a) => a.id !== id));

  const createNewFolder = (x, y) => {
    setDesktopItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'Untitled Folder',
        x,
        y,
        editing: true,
      },
    ]);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleRename = (id, name) => {
    setDesktopItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name, editing: false } : item))
    );
  };

  if (isBooting) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <img src="/icons/apple-logo.png" alt="Apple" className="w-24 animate-fadeIn" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center select-none"
      style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/e6/75/dd/e675dd3f8c7f6d551f4aea8f5661ba2c.jpg')",
      }}
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      <TopBar />
      {desktopItems.map((item) => (
        <DraggableIcon
          key={item.id}
          item={item}
          onRename={handleRename}
          onPositionChange={(x, y) =>
            setDesktopItems((prev) =>
              prev.map((d) => (d.id === item.id ? { ...d, x, y } : d))
            )
          }
        />
      ))}
      {openApps.map((app) => (
        <AppWindow
          key={app.id}
          app={app}
          onClose={closeApp}
          bringToFront={bringToFront}
        />
      ))}
      <Dock apps={appsData} onLaunch={launchApp} />
      {contextMenu && (
        <div
          className="absolute bg-white text-xs rounded shadow p-1"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={() => {
            createNewFolder(contextMenu.x, contextMenu.y);
            setContextMenu(null);
          }}
        >
          <div className="px-3 py-1 hover:bg-gray-100 cursor-pointer">New Folder</div>
        </div>
      )}
    </div>
  );
}

function DraggableIcon({ item, onRename, onPositionChange }) {
  const [pos, setPos] = useState({ x: item.x, y: item.y });

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - pos.x;
    const offsetY = e.clientY - pos.y;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    };

    const handleMouseUp = () => {
      onPositionChange(pos.x, pos.y);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="absolute text-center cursor-default"
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-400 rounded-md" />
        {item.editing ? (
          <input
            autoFocus
            className="text-xs text-center bg-white w-24"
            defaultValue={item.name}
            onBlur={(e) => onRename(item.id, e.target.value || 'Untitled Folder')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onRename(item.id, e.target.value || 'Untitled Folder');
              }
            }}
          />
        ) : (
          <span
            className="text-xs text-white mt-1 cursor-pointer"
            onDoubleClick={() => onRename(item.id, item.name)}
          >
            {item.name}
          </span>
        )}
      </div>
    </div>
  );
}
