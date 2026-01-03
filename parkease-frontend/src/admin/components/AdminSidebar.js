import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <h2 className="admin-title">Admin Panel</h2>

            <nav>
                <NavLink to="/admin" end>Dashboard</NavLink>
                <NavLink to="/admin/areas">Areas</NavLink>
                <NavLink to="/admin/bookings">Bookings</NavLink>
                <NavLink to="/admin/stats">Statistics</NavLink>
            </nav>
        </aside>
    );
}

export default AdminSidebar;
