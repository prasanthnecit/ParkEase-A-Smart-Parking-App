import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import "./UserLayout.css";

export default function UserLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>ParkEase</h2>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/user/book">
                        Book Slot
                    </NavLink>

                    <NavLink to="/user/history">
                        Booking History
                    </NavLink>

                    <NavLink to="/user/profile">
                        Profile
                    </NavLink>
                </nav>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </aside>

            {/* Content */}
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}
