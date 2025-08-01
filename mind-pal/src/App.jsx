import { useState } from "react";
import NoteUploader from "./components/NoteUploader";
import FileViewer from "./components/FileViewer";
import VoiceMemo from "./components/VoiceMemo";
import AIChat from "./components/AIChat";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">🧠 MindPal – AI Knowledge Base</h1>

      {/* Note input */}
      <NoteUploader onAddNote={addNote} />

      {/* File Upload (PDF/TXT) */}
      <FileViewer onExtractText={addNote} />

      {/* Voice Memo */}
      <VoiceMemo onAddVoiceNote={addNote} />

      {/* AI Q&A Chat */}
      <AIChat notes={notes} />
    </div>
  );
}

export default App;
