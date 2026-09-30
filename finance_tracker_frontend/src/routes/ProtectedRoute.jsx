import { Navigate } from "react-router-dom";
import { useSession } from "../context/sessionProvider";

const ProtectedRoute = ({ children }) => {
    const { session } = useSession();

    if (session.status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    };

    if (session.status === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    return children;

};
export default ProtectedRoute;