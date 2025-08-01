import { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceMemo({ onAddVoiceNote }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onAddVoiceNote({ type: "voice", content: text });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleStart = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="p-6 border border-gray-700 bg-black rounded-2xl shadow-lg text-white transition-all duration-300 mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-400">
        <Mic size={24} className="text-purple-500" />
        Record a Voice Memo
      </h2>

      <button
        onClick={listening ? handleStop : handleStart}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white transition cursor-pointer
        ${
          listening
            ? "bg-red-600 animate-pulse"
            : "bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/40"
        }`}
      >
        {listening ? (
          <>
            <MicOff size={20} /> Stop Recording
          </>
        ) : (
          <>
            <Mic size={20} /> Start Recording
          </>
        )}
      </button>

      {transcript && (
        <div className="mt-4 p-4 bg-gray-900 border border-purple-600 rounded text-purple-200 text-sm shadow-inner">
          <strong>Transcript:</strong> {transcript}
        </div>
      )}
    </div>
  );
}
