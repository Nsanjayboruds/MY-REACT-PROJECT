import UserProfilePanel from '../components/UserProfilePanel';

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-10 px-4">
      <div className="max-w-xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
          👤 Your Profile
        </h1>

        <UserProfilePanel />

        <div className="mt-8 text-center opacity-80 text-sm">
          <p>🚀 Thanks for using Mobile Tracker Hackathon Edition!</p>
        </div>
      </div>
    </div>
  );
}
