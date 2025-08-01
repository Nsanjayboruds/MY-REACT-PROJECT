// src/context/MoodContext.jsx
import { createContext, useContext, useState } from 'react';

const MoodContext = createContext();

export const useMood = () => useContext(MoodContext);

export function MoodProvider({ children }) {
  const [mood, setMood] = useState('');
  const [history, setHistory] = useState([]);

  const logMood = (moodEntry) => {
    const updated = [...history, moodEntry];
    setHistory(updated);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
  };

  return (
    <MoodContext.Provider value={{ mood, setMood, history, logMood }}>
      {children}
    </MoodContext.Provider>
  );
}
