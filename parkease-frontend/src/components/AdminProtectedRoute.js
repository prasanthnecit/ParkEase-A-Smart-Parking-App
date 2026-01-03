import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import {jwtDecode} from "jwt-decode";

function AdminProtectedRoute({ children }) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);

        if (decoded.role !== "ROLE_ADMIN") {
            return <Navigate to="/home" replace />;
        }

        return children;

    } catch (err) {
        return <Navigate to="/admin/login" replace />;
    }
}

export default AdminProtectedRoute;
