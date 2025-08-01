// MessageBubble.jsx
export default function MessageBubble({ from, text }) {
  const isUser = from === "user";

  return (
    <div
      className={`p-3 rounded-xl max-w-lg w-fit whitespace-pre-line ${
        isUser
          ? "bg-green-700 self-end text-right ml-auto"
          : "bg-gray-700 self-start text-left"
      }`}
    >
      <span className="block text-sm font-medium">
        {isUser ? "You" : "Persona"}
      </span>
      <p className="mt-1 text-base text-white">{text}</p>
    </div>
  );
}
