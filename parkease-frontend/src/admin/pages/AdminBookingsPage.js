import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        api.get("/admin/bookings").then(res => setBookings(res.data));
    }, []);

    return (
        <>
            <h2>All Bookings</h2>

            {bookings.map(b => (
                <div key={b.id}>
                    {b.userId} — {b.slotId} — {b.startTime} → {b.endTime}
                </div>
            ))}
        </>
    );
}
