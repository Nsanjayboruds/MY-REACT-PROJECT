import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I'm your persona assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [tone, setTone] = useState("Friendly"); // 🎯 user-selectable tone

  // Load TTS voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Tone → Voice mapping
  const getVoiceForTone = (tone) => {
    tone = tone?.toLowerCase();

    if (tone.includes("wise"))
      return voices.find((v) => v.name.includes("Daniel") || v.name.includes("Matthew"));
    if (tone.includes("sarcastic"))
      return voices.find((v) => v.name.includes("Samantha") || v.name.includes("Zira"));
    if (tone.includes("robotic"))
      return voices.find((v) => v.name.includes("Microsoft David") || v.name.includes("Google UK English Male"));
    if (tone.includes("friendly"))
      return voices.find((v) => v.name.includes("Google US English") || v.name.includes("Jenny"));

    return voices[0]; // fallback
  };

  const speak = (text, tone) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    const voice = getVoiceForTone(tone);
    if (voice) utter.voice = voice;
    synth.speak(utter);
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startListening = () => {
    if (!recognition) return alert("🎙️ Speech Recognition not supported.");
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e);
      alert(`Speech error: ${e.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const stopListening = () => {
    recognition?.stop();
    setListening(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        prompt: input,
      });

      const aiText = res.data.response;
      const aiMessage = { from: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
      speak(aiText, tone); // Speak with selected tone
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "❌ Error getting response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">💬 Chat with Your AI Persona</h1>

      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium">🎭 Select Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option>Friendly</option>
          <option>Wise</option>
          <option>Robotic</option>
          <option>Sarcastic</option>
          <option>Funny</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 max-w-2xl">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[70%] ${
              msg.from === "user"
                ? "bg-green-700 self-end"
                : "bg-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-6 max-w-2xl">
        <input
          className="flex-1 p-2 rounded bg-gray-900 text-white"
          placeholder="Type or speak your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <button
          className={`px-4 py-2 rounded ${
            listening ? "bg-yellow-500" : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={startListening}
          disabled={loading}
        >
          🎙️
        </button>

        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={stopListening}
          disabled={!listening}
        >
          ❌
        </button>

        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
