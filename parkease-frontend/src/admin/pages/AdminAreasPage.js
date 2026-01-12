import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminAreasPage.css";

export default function AdminAreasPage() {
    const navigate = useNavigate();
    const [areas, setAreas] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const loadAreas = async () => {
        const res = await api.get("/admin/areas");
        setAreas(res.data);
    };

    useEffect(() => {
        loadAreas();
    }, []);

    const createArea = async (e) => {
        e.preventDefault();
        await api.post("/admin/areas", { name, location });
        setName("");
        setLocation("");
        loadAreas();
    };

    const deleteArea = async (id) => {
        await api.delete(`/admin/areas/${id}`);
        loadAreas();
    };

    return (
        <div className="admin-areas">
            <h2 className="page-title">Manage Parking Areas</h2>

            {/* ===== ADD AREA CARD ===== */}
            <div className="area-card">
                <h3>Add New Area</h3>

                <form className="area-form" onSubmit={createArea}>
                    <input
                        placeholder="Area Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <input
                        placeholder="Location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        required
                    />

                    <button type="submit">Add Area</button>
                </form>
            </div>

            {/* ===== AREA LIST ===== */}
            <div className="area-list-grid">
                {areas.map(area => (
                    <div key={area.id} className="area-item">
                        <div className="area-info">
                            <h4>{area.name}</h4>
                            <span>{area.location}</span>
                        </div>

                        <div className="area-actions">
                            <button
                                className="btn secondary"
                                onClick={() =>
                                    navigate(`/admin/areas/${area.id}/slots`)
                                }
                            >
                                Manage Slots
                            </button>

                            <button
                                className="btn danger"
                                onClick={() => deleteArea(area.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
