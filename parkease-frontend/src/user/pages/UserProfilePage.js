import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserProfilePage.css";

export default function UserProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("/user/me").then(res => setUser(res.data));
    }, []);

    if (!user) {
        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );
    }

    const initials = user.name
        ? user.name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
        : "U";

    return (
        <div className="profile-page">
            <h2 className="profile-title">My Profile</h2>

            {/* ===== PROFILE HEADER ===== */}
            <div className="profile-header-card">
                <div className="profile-avatar">
                    {initials}
                </div>

                <div className="profile-header-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            </div>

            {/* ===== PROFILE DETAILS ===== */}
            <div className="profile-info-grid">
                <div className="info-card">
                    <span className="info-label">Phone Number</span>
                    <span className="info-value">
                        {user.phoneNumber}
                    </span>
                </div>

                <div className="info-card">
                    <span className="info-label">Vehicle Type</span>
                    <span className="info-value">
                        {user.vehicleType}
                    </span>
                </div>

                <div className="info-card">
                    <span className="info-label">Vehicle Number</span>
                    <span className="info-value">
                        {user.vehicleNumber}
                    </span>
                </div>
            </div>
        </div>
    );
}
