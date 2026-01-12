import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
    const [areas, setAreas] = useState([]);
    const [slotsByArea, setSlotsByArea] = useState({});
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const areasRes = await api.get("/admin/areas");
            const bookingsRes = await api.get("/admin/bookings");

            const areasData = areasRes.data;
            setAreas(areasData);
            setBookings(bookingsRes.data);

            const slotMap = {};
            for (const area of areasData) {
                const slotRes = await api.get(`/admin/slots/area/${area.id}`);
                slotMap[area.id] = slotRes.data;
            }

            setSlotsByArea(slotMap);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
        }
    };

    const getAreaStats = (areaId) => {
        const slots = slotsByArea[areaId] || [];

        const totalSlots = slots.length;
        const activeSlots = slots.filter(s => s.active).length;
        const maintenanceSlots = totalSlots - activeSlots;

        const slotIds = slots.map(s => s.id);
        const bookedSlots = bookings.filter(b =>
            slotIds.includes(b.slotId)
        ).length;

        const availableSlots = activeSlots - bookedSlots;

        return {
            totalSlots,
            activeSlots,
            maintenanceSlots,
            bookedSlots,
            availableSlots
        };
    };

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard…</div>;
    }

    /* ===== OVERALL STATS ===== */
    const overall = areas.reduce(
        (acc, area) => {
            const s = getAreaStats(area.id);
            acc.total += s.totalSlots;
            acc.active += s.activeSlots;
            acc.maintenance += s.maintenanceSlots;
            acc.booked += s.bookedSlots;
            acc.available += s.availableSlots;
            return acc;
        },
        { total: 0, active: 0, maintenance: 0, booked: 0, available: 0 }
    );

    return (
        <div className="admin-dashboard clean">
            <h2 className="page-title">Dashboard Overview</h2>

            {/* ===== OVERALL SUMMARY ===== */}
            <div className="summary-row">
                <div className="summary-card">
                    <span>Total Slots</span>
                    <strong>{overall.total}</strong>
                </div>

                <div className="summary-card active">
                    <span>Active</span>
                    <strong>{overall.active}</strong>
                </div>

                <div className="summary-card maintenance">
                    <span>Maintenance</span>
                    <strong>{overall.maintenance}</strong>
                </div>

                <div className="summary-card booked">
                    <span>Booked</span>
                    <strong>{overall.booked}</strong>
                </div>

                <div className="summary-card available">
                    <span>Available</span>
                    <strong>{overall.available}</strong>
                </div>
            </div>

            {/* ===== AREA LIST ===== */}
            <div className="area-list">
                {areas.map(area => {
                    const s = getAreaStats(area.id);

                    return (
                        <div className="area-row" key={area.id}>
                            <div className="area-name">
                                {area.name}
                            </div>

                            <div className="area-stats">
                                <span>Total: <b>{s.totalSlots}</b></span>
                                <span>Active: <b>{s.activeSlots}</b></span>
                                <span>Maintenance: <b>{s.maintenanceSlots}</b></span>
                                <span>Booked: <b>{s.bookedSlots}</b></span>
                                <span>Available: <b>{s.availableSlots}</b></span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
