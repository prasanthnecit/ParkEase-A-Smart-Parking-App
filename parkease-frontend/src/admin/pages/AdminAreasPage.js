import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";


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

        await api.post("/admin/areas", {
            name,
            location
        });

        setName("");
        setLocation("");
        loadAreas();
    };

    const deleteArea = async (id) => {
        await api.delete(`/admin/areas/${id}`);
        loadAreas();
    };

    return (
        <div>
            <h2>Manage Parking Areas</h2>

            <form onSubmit={createArea}>
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

            <hr />

            <ul>
                {areas.map(area => (
                    <li key={area.id}>
                        <b>{area.name}</b> — {area.location}
                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() => deleteArea(area.id)}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate(`/admin/areas/${area.id}/slots`)}
                        >
                            Manage Slots
                        </button>

                    </li>

                ))}
            </ul>
        </div>
    );
}
