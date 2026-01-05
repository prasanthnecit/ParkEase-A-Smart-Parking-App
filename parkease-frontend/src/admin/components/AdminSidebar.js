import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";

export default function AdminSidebar() {
    return (
        <div style={{
            width: 220,
            background: "#5b2be0",
            color: "#fff",
            padding: 20,
            minHeight: "100vh"
        }}>
            <h3>Admin</h3>

            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link to="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
                <Link to="/admin/areas" style={{ color: "#fff" }}>Areas</Link>
                <Link to="/admin/bookings" style={{ color: "#fff" }}>Bookings</Link>
                <button onClick={logout}>Logout</button>
            </nav>
        </div>
    );
}
