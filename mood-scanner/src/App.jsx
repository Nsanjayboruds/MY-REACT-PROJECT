import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import History from './pages/History';
import Callback from './pages/Callback';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/history" element={<History />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}
