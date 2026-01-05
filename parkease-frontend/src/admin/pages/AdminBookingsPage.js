import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminBookingsPage.css";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");

    useEffect(() => {
        loadAreas();
        loadAllBookings();
    }, []);

    const loadAreas = async () => {
        const res = await api.get("/admin/areas");
        setAreas(res.data);
    };

    const loadAllBookings = async () => {
        const res = await api.get("/admin/bookings");
        setBookings(res.data);
    };

    const loadBookingsByArea = async (areaId) => {
        if (!areaId) {
            loadAllBookings();
            return;
        }
        const res = await api.get(`/admin/bookings/area/${areaId}`);
        setBookings(res.data);
    };

    const handleAreaChange = (e) => {
        const areaId = e.target.value;
        setSelectedArea(areaId);
        loadBookingsByArea(areaId);
    };

    return (
        <div className="admin-bookings">
            <h2>Booking Overview</h2>

            <div className="booking-filter">
                <label>Filter by Area:</label>
                <select value={selectedArea} onChange={handleAreaChange}>
                    <option value="">All Areas</option>
                    {areas.map(area => (
                        <option key={area.id} value={area.id}>
                            {area.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="table-wrapper">
                <table className="booking-table">
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Slot Code</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Vehicle</th>
                        <th>Amount</th>
                    </tr>
                    </thead>

                    <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="no-bookings">
                                No bookings found
                            </td>
                        </tr>
                    ) : (
                        bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.userId}</td>
                                <td>{booking.slotCode}</td>
                                <td>{new Date(booking.startTime).toLocaleString()}</td>
                                <td>{new Date(booking.endTime).toLocaleString()}</td>
                                <td>{booking.vehicleType}</td>
                                <td className="amount">₹{booking.amount}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
