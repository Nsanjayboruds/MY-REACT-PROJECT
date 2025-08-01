// AvatarCard.jsx
export default function AvatarCard({ name, tone, backstory, avatarUrl }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 text-white transition hover:scale-105 duration-200">
      <img
        src={avatarUrl}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-green-500"
      />
      <h2 className="text-xl font-bold text-center">{name}</h2>
      <p className="text-sm text-center italic text-green-400">{tone}</p>
      <p className="text-sm mt-3 text-gray-300">{backstory}</p>
    </div>
  );
}
