import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CreatePersona from './pages/CreatePersona';
import Chat from './pages/Chat';
import Personas from './pages/Personas';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

export default function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePersona />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
