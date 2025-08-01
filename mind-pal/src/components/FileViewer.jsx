import { useState, useRef } from "react";
import { FileText, UploadCloud } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// ✅ Set workerSrc for Vite (no default export)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function FileViewer({ onExtractText }) {
  const [fileName, setFileName] = useState("");
  const [fileText, setFileText] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "txt") {
      const text = await file.text();
      setFileText(text);
      onExtractText({ type: "file", content: text });
    } else if (ext === "pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + "\n";
      }

      setFileText(text);
      onExtractText({ type: "file", content: text });
    } else {
      alert("Unsupported file type. Please upload a TXT or PDF file.");
    }
  };

  const triggerFilePicker = () => fileInputRef.current?.click();

  return (
    <div className="p-6 border border-blue-800 bg-black text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
        <UploadCloud className="text-blue-500" size={24} />
        Upload a File
      </h2>

      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleFile}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      <button
        onClick={triggerFilePicker}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition cursor-pointer"
      >
        Browse File
      </button>

      {fileName && (
        <div className="mt-3 text-sm text-blue-300">
          📌 <strong>{fileName}</strong> loaded successfully.
        </div>
      )}

      {fileText && (
        <div className="mt-4 max-h-48 overflow-y-auto p-3 bg-gray-900 border border-blue-700 rounded-lg text-sm leading-relaxed text-blue-200">
          <FileText className="inline mr-2 text-blue-400" size={16} />
          {fileText.slice(0, 500)}...
        </div>
      )}
    </div>
  );
}
