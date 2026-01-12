import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import axios from "axios";
import "./UserBookingPage.css";

function UserBookingPage() {
    const [areas, setAreas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/parking-areas", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then(res => setAreas(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="parking-container">
            <h2>Select Parking Area</h2>

            <div className="parking-grid">
                {areas.map(area => (
                    <div
                        className="parking-card violet-outline"
                        key={area.id}
                        onClick={() => navigate(`/slots/${area.id}`)}
                    >
                        <h3>{area.name}</h3>
                        <p>{area.location}</p>
                        <span className="action-text">View Slots →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserBookingPage;
