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

    /* ================= ANALYTICS ================= */

    const getAnalytics = (list) => {
        const totalBookings = list.length;
        const totalRevenue = list.reduce((s, b) => s + b.amount, 0);

        const avgDurationMinutes =
            totalBookings === 0
                ? 0
                : list.reduce(
                    (sum, b) =>
                        sum +
                        (new Date(b.endTime) -
                            new Date(b.startTime)),
                    0
                ) /
                totalBookings /
                60000;

        const hourMap = {};
        const slotMap = {};

        list.forEach(b => {
            const hour = new Date(b.startTime).getHours();
            hourMap[hour] = (hourMap[hour] || 0) + 1;

            slotMap[b.slotCode] =
                (slotMap[b.slotCode] || 0) + 1;
        });

        const peakHour = Object.entries(hourMap).sort(
            (a, b) => b[1] - a[1]
        )[0];

        const mostBookedSlot = Object.entries(slotMap).sort(
            (a, b) => b[1] - a[1]
        )[0];

        return {
            totalBookings,
            totalRevenue,
            avgDurationMinutes,
            peakHour,
            mostBookedSlot,
        };
    };

    /* ================= CSV ================= */

    const downloadCSV = (filename, list, title) => {
        const a = getAnalytics(list);

        let csv = `${title}\n\n`;
        csv += `Total Bookings,${a.totalBookings}\n`;
        csv += `Total Revenue,₹${a.totalRevenue}\n`;
        csv += `Average Duration (mins),${a.avgDurationMinutes.toFixed(1)}\n`;
        csv += `Peak Hour,${a.peakHour ? a.peakHour[0] + ":00" : "-"}\n`;
        csv += `Most Booked Slot,${a.mostBookedSlot ? a.mostBookedSlot[0] : "-"}\n\n`;

        csv += "User,Slot,Start Time,End Time,Vehicle,Amount\n";
        list.forEach(b => {
            csv += `${b.userId},${b.slotCode},"${new Date(
                b.startTime
            ).toLocaleString()}","${new Date(
                b.endTime
            ).toLocaleString()}",${b.vehicleType},${b.amount}\n`;
        });

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    const groupedByMonth = bookings.reduce((acc, b) => {
        const key = new Date(b.startTime).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
        if (!acc[key]) acc[key] = [];
        acc[key].push(b);
        return acc;
    }, {});

    const overall = getAnalytics(bookings);

    return (
        <div className="admin-bookings">
            <h2 className="page-title">Booking Reports</h2>

            {/* FILTER */}
            <div className="filter-card">
                <label>Mall</label>
                <select
                    className="styled-select"
                    value={selectedArea}
                    onChange={handleAreaChange}
                >
                    <option value="">All Malls</option>
                    {areas.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* ===== OVERALL REPORT (FIXED) ===== */}
            <div className="overall-report">
                <div className="overall-header">
                    <h3>Overall Report</h3>
                    <button
                        className="download-btn"
                        onClick={() =>
                            downloadCSV(
                                "overall-booking-report.csv",
                                bookings,
                                "Overall Booking Report"
                            )
                        }
                    >
                        Download Overall CSV
                    </button>
                </div>

                {/* ✅ THIS GRID IS THE KEY */}
                <div className="overall-metrics-grid">
                    <div className="metric-card">
                        <span>Total Bookings</span>
                        <strong>{overall.totalBookings}</strong>
                    </div>

                    <div className="metric-card">
                        <span>Total Revenue</span>
                        <strong>₹{overall.totalRevenue}</strong>
                    </div>

                    <div className="metric-card">
                        <span>Average Duration</span>
                        <strong>
                            {overall.avgDurationMinutes.toFixed(1)} mins
                        </strong>
                    </div>

                    <div className="metric-card">
                        <span>Peak Hour</span>
                        <strong>
                            {overall.peakHour
                                ? `${overall.peakHour[0]}:00`
                                : "-"}
                        </strong>
                    </div>

                    <div className="metric-card">
                        <span>Most Booked Slot</span>
                        <strong>
                            {overall.mostBookedSlot
                                ? overall.mostBookedSlot[0]
                                : "-"}
                        </strong>
                    </div>
                </div>
            </div>

            {/* ===== MONTH SECTIONS ===== */}
            {Object.entries(groupedByMonth).map(([month, list]) => {
                const monthRevenue = list.reduce(
                    (s, b) => s + b.amount,
                    0
                );

                return (
                    <div className="month-section" key={month}>
                        <div className="month-header">
                            <h3>{month}</h3>
                            <div className="month-actions">
                                <span className="revenue-chip">
                                    ₹{monthRevenue}
                                </span>
                                <button
                                    className="download-btn small"
                                    onClick={() =>
                                        downloadCSV(
                                            `${month}-booking-report.csv`,
                                            list,
                                            `${month} Booking Report`
                                        )
                                    }
                                >
                                    Download CSV
                                </button>
                            </div>
                        </div>

                        <div className="table-card">
                            <table className="booking-table">
                                <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Slot</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Vehicle</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.map(b => (
                                    <tr key={b.id}>
                                        <td>{b.userId}</td>
                                        <td>{b.slotCode}</td>
                                        <td>{new Date(b.startTime).toLocaleString()}</td>
                                        <td>{new Date(b.endTime).toLocaleString()}</td>
                                        <td>{b.vehicleType}</td>
                                        <td className="amount">
                                            ₹{b.amount}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
