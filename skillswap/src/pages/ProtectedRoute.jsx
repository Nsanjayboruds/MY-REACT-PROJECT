import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Using the live context

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
