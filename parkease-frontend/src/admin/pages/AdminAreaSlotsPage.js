import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminAreaSlotsPage() {
    const { areaId } = useParams();
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        api.get(`/admin/areas/${areaId}/slots`)
            .then(res => setSlots(res.data));
    }, [areaId]);

    const toggleStatus = (slotId, active) => {
        api.put("/admin/slots/status", {
            slotId,
            active: !active
        }).then(() => {
            setSlots(slots.map(s =>
                s.id === slotId ? { ...s, active: !active } : s
            ));
        });
    };

    return (
        <>
            <h2>Slots</h2>

            {slots.map(slot => (
                <div key={slot.id}>
                    {slot.slotCode} —
                    {slot.active ? "Active" : "Inactive"}

                    <button onClick={() => toggleStatus(slot.id, slot.active)}>
                        Toggle
                    </button>
                </div>
            ))}
        </>
    );
}
