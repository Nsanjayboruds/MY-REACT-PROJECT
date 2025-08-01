import { useState } from "react";
import { answerQuestion } from "../utils/ai";
import { Sparkles } from "lucide-react";

export default function AIChat({ notes }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    const context = notes.map((n) => n.content).join(" ");
    setLoading(true);
    setResponse("");
    const answer = await answerQuestion(context, question);
    setResponse(answer);
    speak(answer); // 🔊 Speak the answer
    setLoading(false);
  };

  return (
    <div className="p-6 border border-blue-800 rounded-2xl bg-black text-white shadow-md transition-all duration-300 hover:shadow-xl mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
        <Sparkles className="text-yellow-400" size={24} />
        Ask Your AI Assistant
      </h2>

      <div className="flex gap-2 items-center">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-grow p-3 border border-blue-600 bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
          placeholder="Type a question about your notes..."
        />
        <button
          onClick={handleAsk}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow shadow-blue-500/30 cursor-pointer"
        >
          Ask
        </button>
      </div>

      {loading && (
        <p className="mt-4 text-sm text-blue-300 animate-pulse">🤖 Thinking...</p>
      )}

      {response && (
        <div className="mt-6 p-4 bg-gray-900 border-l-4 border-green-500 rounded text-green-300 shadow-inner text-sm">
          <strong>Answer:</strong> {response}
        </div>
      )}
    </div>
  );
}
