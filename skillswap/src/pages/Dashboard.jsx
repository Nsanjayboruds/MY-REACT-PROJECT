import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setName(data.name);
          setSkillsOffered(data.skills_offered.join(", "));
          setSkillsWanted(data.skills_wanted.join(", "));
        } else {
          alert("No user data found.");
        }
      } else {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const updatedData = {
      name,
      skills_offered: skillsOffered.split(",").map((s) => s.trim()),
      skills_wanted: skillsWanted.split(",").map((s) => s.trim()),
    };

    await updateDoc(doc(db, "users", user.uid), updatedData);
    alert("Profile updated!");
    setUserData({ ...userData, ...updatedData });
    setEditMode(false);
  };

  if (!userData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome, {userData.name} 👋
            </h2>
            <p className="text-gray-600 mt-1">{userData.email}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Logout
            </button>

            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>

            <button
              onClick={() => navigate("/match")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
            >
              Show Match
            </button>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Edit Form or Display */}
        {editMode ? (
          <div className="grid gap-4">
            <input
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              className="w-full p-2 border rounded"
              value={skillsOffered}
              onChange={(e) => setSkillsOffered(e.target.value)}
              placeholder="Skills you offer (comma separated)"
            />
            <input
              className="w-full p-2 border rounded"
              value={skillsWanted}
              onChange={(e) => setSkillsWanted(e.target.value)}
              placeholder="Skills you want to learn (comma separated)"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Offered Skills */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">
                Skills You Offer
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills_offered.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Wanted Skills */}
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-green-800">
                Skills You Want to Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills_wanted.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
