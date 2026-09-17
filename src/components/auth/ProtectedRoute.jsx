import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth();

  // Wait until AuthContext finishes checking the saved token
  if (authLoading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-[var(--paper)]">
        <p className="eyebrow text-[var(--burgundy)]">
          Checking access...
        </p>
      </main>
    );
  }

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;