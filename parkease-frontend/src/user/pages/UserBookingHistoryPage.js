import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import "./UserBookingHistoryPage.css";

export default function UserBookingHistoryPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        api.get("/bookings").then(res => setBookings(res.data));
    }, []);

    /* ================= ANALYTICS ================= */
    const analytics = useMemo(() => {
        if (bookings.length === 0) {
            return {
                totalBookings: 0,
                totalAmount: 0
            };
        }

        const totalAmount = bookings.reduce(
            (sum, b) => sum + b.amount,
            0
        );

        return {
            totalBookings: bookings.length,
            totalAmount
        };
    }, [bookings]);

    /* ================= GROUP BY MONTH ================= */
    const groupedByMonth = useMemo(() => {
        const map = {};

        bookings.forEach(b => {
            const date = new Date(b.startTime);
            const key = date.toLocaleString("default", {
                month: "long",
                year: "numeric"
            });

            if (!map[key]) map[key] = [];
            map[key].push(b);
        });

        return map;
    }, [bookings]);

    return (
        <div className="booking-history">
            <h2>Booking History</h2>

            {/* ===== SUMMARY ===== */}
            <div className="history-summary">
                <div>
                    <span>Total Bookings</span>
                    <strong>{analytics.totalBookings}</strong>
                </div>
                <div>
                    <span>Total Spent</span>
                    <strong>₹ {analytics.totalAmount}</strong>
                </div>
            </div>

            {/* ===== HISTORY ===== */}
            {Object.keys(groupedByMonth).length === 0 && (
                <p className="empty-text">No bookings found</p>
            )}

            {Object.entries(groupedByMonth).map(
                ([month, items]) => (
                    <div key={month} className="month-section">
                        <h3 className="month-title">{month}</h3>

                        {items.map(b => (
                            <div
                                key={b.id}
                                className="history-row"
                            >
                                <div className="history-main">
                                    <span className="slot">
                                        Slot {b.slotCode}
                                    </span>
                                    <span className="time">
                                        {new Date(
                                            b.startTime
                                        ).toLocaleString()}
                                        {" "}–{" "}
                                        {new Date(
                                            b.endTime
                                        ).toLocaleString()}
                                    </span>
                                </div>

                                <div className="history-amount">
                                    ₹ {b.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
