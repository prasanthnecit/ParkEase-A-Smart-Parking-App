import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get("/admin/stats").then(res => setStats(res.data));
    }, []);

    if (!stats) return <p>Loading...</p>;

    return (
        <>
            <h2>Dashboard</h2>
            <p>Total Areas: {stats.totalAreas}</p>
            <p>Total Slots: {stats.totalSlots}</p>
            <p>Active Slots: {stats.activeSlots}</p>
            <p>Total Bookings: {stats.totalBookings}</p>
            <p>Current Bookings: {stats.currentBookings}</p>
        </>
    );
}
