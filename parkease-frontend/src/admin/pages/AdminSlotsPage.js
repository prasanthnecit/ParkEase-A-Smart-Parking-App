import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminSlotsPage() {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-content">
                <h2>Parking Areas</h2>
                <p>Area management UI will be here.</p>
            </main>
        </div>
    );
}

export default AdminSlotsPage;
