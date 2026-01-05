import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />
            <div style={{ padding: 20, flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
}
