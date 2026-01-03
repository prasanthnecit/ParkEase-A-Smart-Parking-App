import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminAreasPage() {
    const [areas, setAreas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/admin/areas").then(res => setAreas(res.data));
    }, []);

    return (
        <>
            <h2>Parking Areas</h2>

            {areas.map(area => (
                <div key={area.id} style={{ border: "1px solid #ccc", padding: "12px" }}>
                    <h4>{area.name}</h4>
                    <p>{area.location}</p>

                    <button
                        onClick={() => navigate(`/admin/areas/${area.id}/slots`)}
                    >
                        Manage Slots
                    </button>
                </div>
            ))}
        </>
    );
}
