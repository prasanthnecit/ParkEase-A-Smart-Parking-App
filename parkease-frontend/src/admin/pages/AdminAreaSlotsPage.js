import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function AdminAreaSlotsPage() {
    const { areaId } = useParams();

    const [slots, setSlots] = useState([]);
    const [slotCodesInput, setSlotCodesInput] = useState("");

    // Load slots for this area
    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        const res = await api.get(`/admin/slots/area/${areaId}`);
        console.log(res.data);
        setSlots(res.data);
    };

    // Bulk create slots
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

    // Enable / Disable slot
    const toggleSlotStatus = async (slotId, active) => {
        await api.put(`/admin/slots/${slotId}/status`, {
            active: !active
        });
        fetchSlots();
    };

    // Delete slot
    const deleteSlot = async (slotId) => {
        if (!window.confirm("Delete this slot?")) return;
        await api.delete(`/admin/slots/${slotId}`);
        fetchSlots();
    };

    return (
        <div>
            <h2>Slot Management</h2>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Enter slot codes (A1,A2,A3)"
                    value={slotCodesInput}
                    onChange={(e) => setSlotCodesInput(e.target.value)}
                />
                <button onClick={createSlots}>Add Slots</button>
            </div>

            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Slot Code</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {slots.map(slot => (
                    <tr key={slot.id}>
                        <td>{slot.slotCode}</td>
                        <td>{slot.active ? "Active" : "Inactive"}</td>
                        <td>
                            <button
                                onClick={() =>
                                    toggleSlotStatus(slot.id, slot.active)
                                }
                            >
                                {slot.active ? "Disable" : "Enable"}
                            </button>

                            <button
                                onClick={() => deleteSlot(slot.id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
