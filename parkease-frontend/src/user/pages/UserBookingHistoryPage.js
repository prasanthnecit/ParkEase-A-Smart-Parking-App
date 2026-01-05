import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserBookingHistoryPage.css";

export default function UserBookingHistoryPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        api.get("/bookings").then(res => setBookings(res.data));
    }, []);
    console.log(bookings);
    return (
        <div className="booking-history">
            <h2>Booking History</h2>

            {bookings.length === 0 && <p>No bookings found</p>}

            {bookings.map(b => (
                <div key={b.id} className="booking-card">
                    <div className="booking-row">
                        <span><b>Slot</b></span>
                        <span>{b.slotCode}</span>
                    </div>

                    <div className="booking-row">
                        <span><b>From</b></span>
                        <span>{new Date(b.startTime).toLocaleString()}</span>
                    </div>

                    <div className="booking-row">
                        <span><b>To</b></span>
                        <span>{new Date(b.endTime).toLocaleString()}</span>
                    </div>

                    <div className="booking-amount">
                        ₹ {b.amount}
                    </div>
                </div>
            ))}
        </div>
    );

}
