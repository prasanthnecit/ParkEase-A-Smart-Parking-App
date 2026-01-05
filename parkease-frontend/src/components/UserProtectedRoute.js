import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export default function UserProtectedRoute({ children }) {
    const token = getToken();

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwtDecode(token);

        if (decoded.role !== "USER") {
            return <Navigate to="/" />;
        }

        return children;
    } catch {
        return <Navigate to="/login" />;
    }
}
