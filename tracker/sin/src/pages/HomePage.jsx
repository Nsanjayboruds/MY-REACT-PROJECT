import { useState, useEffect } from 'react';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import InputForm from '../components/InputForm';
import MapView from '../components/MapView';
import { Fade } from 'react-awesome-reveal';

function AwesomeLoader() {
  return (
    <Fade cascade>
      <div className="flex items-center justify-center h-40">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Fade>
  );
}

function HomePage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackNumber = async (number) => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;

    if (!number.startsWith('+')) {
      number = `+91${number}`;
    }

    try {
      const res = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${number}`);
      const data = await res.json();
      const locRes = await fetch('http://ip-api.com/json');
      const locData = await locRes.json();
      data.latitude = locData.lat;
      data.longitude = locData.lon;

      setInfo(data);

      const history = JSON.parse(localStorage.getItem('lookupHistory') || '[]');
      const newEntry = {
        phone: data.phone,
        location: data.location || 'Unknown',
        country: data.country?.name || 'N/A',
        carrier: data.carrier || 'Unknown',
        prefix: data.country?.prefix || '',
        time: new Date().toLocaleTimeString(),
      };
      const updated = [newEntry, ...history.slice(0, 4)];
      localStorage.setItem('lookupHistory', JSON.stringify(updated));
    } catch (err) {
      alert("⚠️ Failed to fetch location info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (info?.phone) {
        trackNumber(info.phone);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [info]);

  return (
    <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-6 rounded-xl shadow-2xl border border-white/20 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold"> Mobile Number Tracker</h1>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      <SignedOut>
        <div className="flex gap-2 mb-4">
          <SignInButton mode="modal">
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">Sign Up</button>
          </SignUpButton>
        </div>
      </SignedOut>

      <InputForm onTrack={trackNumber} />

      {loading && <AwesomeLoader />}

      {info && !loading && (
        <div className="mt-4 space-y-2 animate-fade-in-down">
          <p><strong>📞 Number:</strong> {info.phone}</p>
          <p><strong>📍 Location:</strong> {info.location || 'Unknown'}</p>
          <p><strong>📡 Carrier:</strong> {info.carrier || 'N/A'}</p>
          <p><strong>🌍 Country:</strong> {info.country?.name} ({info.country?.code})</p>
          <p><strong>📶 Country Code:</strong> {info.country?.prefix}</p>
          <p><strong>🔌 Line Type:</strong> {info.line_type || 'N/A'}</p>

          {info.latitude && info.longitude && (
            <MapView lat={info.latitude} lng={info.longitude} />
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
