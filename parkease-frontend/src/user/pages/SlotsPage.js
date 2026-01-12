import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/auth";
import "./SlotsPage.css";

function SlotsPage() {
    const { areaId } = useParams();

    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [vehicleType, setVehicleType] = useState("Car");

    const RATES = {
        Car: 40,
        Bike: 20
    };

    let amount = 0.0;

    const calculateAmount = () => {
        if (!startTime || !endTime) return 0;

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (end <= start) return 0;

        const diffMs = end - start;
        const diffMinutes = diffMs / (1000 * 60);
        const hours = diffMinutes / 60;

        const billableHours = Math.ceil(hours);
        amount = billableHours * RATES[vehicleType];

        return amount;
    };

    const fetchSlots = async () => {
        const res = await axios.get(
            `http://localhost:8080/api/slots/${areaId}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        setSlots(res.data);
    };

    useEffect(() => {
        fetchSlots();
    }, [areaId]);

    const bookSlot = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/bookings",
                {
                    slotId: selectedSlot.slotId,
                    slotCode: selectedSlot.slotCode,
                    areaId,
                    startTime,
                    endTime,
                    vehicleType,
                    amount
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            alert("Booking successful");
            setSelectedSlot(null);
            setStartTime("");
            setEndTime("");
            fetchSlots();
        } catch (err) {
            alert("Slot already booked for this time");
        }
    };

    return (
        <div className="page">
            <h2>Parking Slots</h2>

            {/* ===== LEGEND ===== */}
            <div className="slots-legend">
                <div className="legend-item">
                    <span className="legend-box legend-available" />
                    Available
                </div>
                <div className="legend-item">
                    <span className="legend-box legend-booked" />
                    Booked
                </div>
                <div className="legend-item">
                    <span className="legend-box legend-selected" />
                    Selected
                </div>
            </div>

            {/* ===== SLOT GRID ===== */}
            <div className="slots-grid">
                {slots.map(slot => (
                    <div
                        key={slot.slotId}
                        className={`slot-card ${
                            slot.status === "AVAILABLE"
                                ? "slot-available"
                                : "slot-booked"
                        } ${
                            selectedSlot?.slotId === slot.slotId
                                ? "slot-selected"
                                : ""
                        }`}
                        onClick={() =>
                            slot.status === "AVAILABLE" &&
                            setSelectedSlot(slot)
                        }
                    >
                        <h4>{slot.slotCode}</h4>
                        <p>{slot.status}</p>
                    </div>
                ))}
            </div>

            {/* ===== BOOKING PANEL ===== */}
            {selectedSlot && (
                <div className="booking-card">
                    <h3>Book Slot {selectedSlot.slotCode}</h3>

                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                    />

                    <label>End Time</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                    />

                    <label>Vehicle Type</label>
                    <select
                        value={vehicleType}
                        onChange={e => setVehicleType(e.target.value)}
                    >
                        <option>Car</option>
                        <option>Bike</option>
                    </select>

                    {/* Amount */}
                    {startTime && endTime && (
                        <div
                            style={{
                                marginTop: "12px",
                                fontWeight: "700",
                                color: "#4c1d95"
                            }}
                        >
                            Total Amount: ₹{calculateAmount()}
                        </div>
                    )}

                    <div className="booking-actions">
                        <button onClick={bookSlot}>
                            Confirm Booking
                        </button>
                        <button onClick={() => setSelectedSlot(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SlotsPage;
