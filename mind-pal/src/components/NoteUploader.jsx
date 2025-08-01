import { useState } from "react";
import { StickyNote } from "lucide-react";

export default function NoteUploader({ onAddNote }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAddNote({ type: "text", content: text });
      setText("");
    }
  };

  return (
    <div className="p-6 border border-green-700 bg-black text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-400">
        <StickyNote className="text-green-500" size={24} />
        Add a Quick Note
      </h2>

      <textarea
        className="w-full p-3 border border-green-600 bg-black text-white rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition-all placeholder-gray-400"
        rows={4}
        placeholder="Write something you want to remember..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAdd}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
      >
        Save Note
      </button>
    </div>
  );
}
