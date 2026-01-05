import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserProfilePage.css";
export default function UserProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("/user/me").then(res => setUser(res.data));
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <h2>My Profile</h2>

            <div className="profile-row">
                <span className="profile-label">Name</span>
                <span className="profile-value">{user.name}</span>
            </div>

            <div className="profile-row">
                <span className="profile-label">Email</span>
                <span className="profile-value">{user.email}</span>
            </div>

            <div className="profile-row">
                <span className="profile-label">Phone</span>
                <span className="profile-value">{user.phoneNumber}</span>
            </div>

            <div className="profile-row">
                <span className="profile-label">Vehicle</span>
                <span className="profile-value">
            {user.vehicleType} - {user.vehicleNumber}
        </span>
            </div>
        </div>

    );
}
