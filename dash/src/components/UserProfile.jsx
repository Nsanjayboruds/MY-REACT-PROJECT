import { useState } from "react";
import EditProfile from "./EditProfile";

export default function UserProfile() {
  const [editing, setEditing] = useState(false);

  if (editing) return <EditProfile onClose={() => setEditing(false)} />;

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
      <div className="flex flex-col items-center space-y-4">
        <img
          className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700"
          src="https://avatars.githubusercontent.com/u/180739822?v=4"
          alt="User Avatar"
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Nishant Borude
          </h2>
          <p className="text-gray-500 dark:text-gray-400">nishant@example.com</p>
        </div>
        <div className="w-full">
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Edit Profile
          </button>
        </div>
       
      </div>
    </div>
  );
}
