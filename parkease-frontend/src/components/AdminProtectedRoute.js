import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export default function AdminProtectedRoute({ children }) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    try {
        const decoded = jwtDecode(token);

        if (decoded.role !== "ROLE_ADMIN") {
            return <Navigate to="/" />;
        }

        return children;
    } catch {
        return <Navigate to="/admin/login" />;
    }
}
