import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import InsightsPage from './pages/InsightsPage';
import UserPage from './pages/UserPage';
import AuthGuard from './components/AuthGuard';


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#13262d] to-[#3d5a66] text-white p-6">
        <nav className="flex gap-4 justify-center mb-6 font-semibold text-white">
          <Link  className="relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full" to="/"> Home</Link>
          <Link  className="relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full" to="/history"> History</Link>
          <Link  className="relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full" to="/insights"> Insights</Link>
          <Link  className="relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full" to="/user">Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </AuthGuard>
  );
}
