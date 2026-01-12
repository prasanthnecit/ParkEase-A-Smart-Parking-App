import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import "./AdminSidebar.css";

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h2>Admin Panel</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/areas">
                    Areas
                </NavLink>

                <NavLink to="/admin/bookings">
                    Bookings
                </NavLink>
            </nav>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </aside>
    );
}
