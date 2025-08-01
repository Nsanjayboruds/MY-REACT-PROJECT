
export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-800 to-purple-700 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
    </div>
  );
}
