export default function Dock({ apps, onLaunch }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-sky-100/50 px-6 py-3 rounded-3xl flex gap-6 z-50 shadow-lg">
      {apps.map((app) => (
        <div
          key={app.id}
          onClick={() => onLaunch(app.id)}
          className="transition-transform duration-150 ease-in-out hover:scale-125 cursor-pointer"
        >
          <img src={app.icon} alt={app.name} className="w-12 h-12 object-contain" />
        </div>
      ))}
    </div>
  );
}
