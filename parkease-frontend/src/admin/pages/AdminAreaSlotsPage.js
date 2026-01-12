import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./AdminAreaSlotsPage.css";

export default function AdminAreaSlotsPage() {
    const { areaId } = useParams();

    const [slots, setSlots] = useState([]);
    const [slotCodesInput, setSlotCodesInput] = useState("");

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        const res = await api.get(`/admin/slots/area/${areaId}`);
        setSlots(res.data);
    };

    const createSlots = async () => {
        if (!slotCodesInput.trim()) return;

        const slotCodes = slotCodesInput
            .split(",")
            .map(code => code.trim())
            .filter(Boolean);

        await api.post("/admin/slots/bulk", {
            areaId,
            slotCodes
        });

        setSlotCodesInput("");
        fetchSlots();
    };

    const toggleSlotStatus = async (slotId, active) => {
        await api.put(`/admin/slots/${slotId}/status`, {
            active: !active
        });
        fetchSlots();
    };

    const deleteSlot = async (slotId) => {
        if (!window.confirm("Delete this slot?")) return;
        await api.delete(`/admin/slots/${slotId}`);
        fetchSlots();
    };

    return (
        <div className="admin-slots">
            <h2 className="page-title">Slot Management</h2>

            {/* ===== CREATE SLOTS ===== */}
            <div className="slot-card">
                <h3>Add Slots</h3>

                <div className="slot-create-box">
                    <input
                        type="text"
                        placeholder="Enter slot codes (A1, A2, A3)"
                        value={slotCodesInput}
                        onChange={(e) =>
                            setSlotCodesInput(e.target.value)
                        }
                    />
                    <button onClick={createSlots}>
                        Add Slots
                    </button>
                </div>
            </div>

            {/* ===== SLOTS TABLE ===== */}
            <div className="table-card">
                <table className="slots-table">
                    <thead>
                    <tr>
                        <th>Slot Code</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {slots.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="no-slots">
                                No slots found
                            </td>
                        </tr>
                    ) : (
                        slots.map(slot => (
                            <tr key={slot.id}>
                                <td className="slot-code">
                                    {slot.slotCode}
                                </td>

                                <td>
                                        <span
                                            className={
                                                slot.active
                                                    ? "status active"
                                                    : "status maintenance"
                                            }
                                        >
                                            {slot.active
                                                ? "Active"
                                                : "Maintenance Work"}
                                        </span>
                                </td>

                                <td className="actions">
                                    <button
                                        className={
                                            slot.active
                                                ? "btn warning"
                                                : "btn success"
                                        }
                                        onClick={() =>
                                            toggleSlotStatus(
                                                slot.id,
                                                slot.active
                                            )
                                        }
                                    >
                                        {slot.active
                                            ? "Disable"
                                            : "Enable"}
                                    </button>

                                    <button
                                        className="btn danger"
                                        onClick={() =>
                                            deleteSlot(slot.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
