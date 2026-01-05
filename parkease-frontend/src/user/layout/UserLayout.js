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
        <div className="user-layout">
            {/* Sidebar */}
            <aside className="user-sidebar">
                <h3 className="user-logo">ParkEase</h3>

                <nav className="user-nav">
                    <NavLink
                        to="/user/book"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >
                        Book Slot
                    </NavLink>

                    <NavLink
                        to="/user/history"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >
                        Booking History
                    </NavLink>

                    <NavLink
                        to="/user/profile"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >
                        Profile
                    </NavLink>

                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Content */}
            <main className="user-content">
                <Outlet />
            </main>
        </div>
    );
}
