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
        const inactiveSlots = totalSlots - activeSlots;

        const slotIds = slots.map(s => s.id);
        const bookedSlots = bookings.filter(b => slotIds.includes(b.slotId)).length;

        const availableSlots = activeSlots - bookedSlots;

        return {
            totalSlots,
            activeSlots,
            inactiveSlots,
            bookedSlots,
            availableSlots
        };
    };

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <table>
                <thead>
                <tr>
                    <th>Area</th>
                    <th>Total Slots</th>
                    <th>Active</th>
                    <th>Inactive</th>
                    <th>Booked</th>
                    <th>Available</th>
                </tr>
                </thead>

                <tbody>
                {areas.map(area => {
                    const stats = getAreaStats(area.id);

                    return (
                        <tr key={area.id}>
                            <td>{area.name}</td>
                            <td>{stats.totalSlots}</td>
                            <td>{stats.activeSlots}</td>
                            <td>{stats.inactiveSlots}</td>
                            <td>{stats.bookedSlots}</td>
                            <td>{stats.availableSlots}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

}
