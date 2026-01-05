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
            <h2>Manage Parking Areas</h2>

            <form className="area-form" onSubmit={createArea}>
                <input
                    placeholder="Area Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <button type="submit">Add Area</button>
            </form>

            <ul className="area-list">
                {areas.map(area => (
                    <li key={area.id} className="area-item">
                        <div>
                            <b>{area.name}</b>
                            <span>{area.location}</span>
                        </div>

                        <div className="area-actions">
                            <button
                                className="danger"
                                onClick={() => deleteArea(area.id)}
                            >
                                Delete
                            </button>

                            <button
                                className="primary"
                                onClick={() => navigate(`/admin/areas/${area.id}/slots`)}
                            >
                                Manage Slots
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
