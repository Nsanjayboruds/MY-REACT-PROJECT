import { useEffect } from 'react';
import InsightsPanel from '../components/InsightsPanel';
import Lenis from '@studio-freight/lenis';

function InsightsPage() {
  const history = JSON.parse(localStorage.getItem('lookupHistory') || '[]');

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy(); 
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center items-start bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-hidden">
      <div className="w-full max-w-4xl p-6 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl animate-slide-in">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          📊 Lookup Insights
        </h1>
        {history.length === 0 ? (
          <p className="text-center text-lg text-gray-300">No lookup data available.</p>
        ) : (
          <InsightsPanel history={history} />
        )}
      </div>
    </div>
  );
}

export default InsightsPage;
