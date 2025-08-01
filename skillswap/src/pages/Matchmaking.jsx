import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

// Utility to normalize Firestore arrays
const normalizeSkills = (skills) => {
  if (!Array.isArray(skills)) return [];
  return skills
    .flatMap((skill) => {
      try {
        // Try parsing stringified array
        if (typeof skill === "string" && skill.startsWith("[")) {
          return JSON.parse(skill);
        }
        return [skill];
      } catch {
        return [skill];
      }
    })
    .map((s) => s.toLowerCase().trim())
    .filter((s) => s.length > 0);
};

const Matchmaking = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          navigate("/signup");
          return;
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          console.error("User document not found");
          return;
        }

        const userData = userSnap.data();
        setCurrentUserData(userData);

        const querySnapshot = await getDocs(collection(db, "users"));
        const allUsers = [];

        querySnapshot.forEach((docSnap) => {
          if (docSnap.id !== currentUser.uid) {
            allUsers.push({ id: docSnap.id, ...docSnap.data() });
          }
        });

        const userWants = normalizeSkills(userData.skills_wanted);
        const userOffers = normalizeSkills(userData.skills_offered);

        const matched = allUsers.filter((other) => {
          const offers = normalizeSkills(other.skills_offered);
          const wants = normalizeSkills(other.skills_wanted);

          const match1 = offers.some((skill) => userWants.includes(skill));
          const match2 = wants.some((skill) => userOffers.includes(skill));

          return match1 || match2;
        });

        setMatches(matched);
      } catch (error) {
        console.error("Matchmaking error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Loading matches...</p>;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🎯 Matched Users</h2>

      {matches.length === 0 ? (
        <p className="text-center text-gray-600">
          No matches found yet. Try adding more skills!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {matches.map((user) => (
            <div key={user.id} className="bg-white border rounded shadow p-4">
              <h3 className="text-xl font-semibold mb-1">{user.name || "Unnamed User"}</h3>
              <p className="text-sm text-gray-600 mb-2">{user.email || "No Email"}</p>

              <div className="mb-2">
                <strong className="text-sm">Skills Offered:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {normalizeSkills(user.skills_offered).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-sm">Skills Wanted:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {normalizeSkills(user.skills_wanted).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matchmaking;
