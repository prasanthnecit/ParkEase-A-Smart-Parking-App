import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function HomePage() {
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                );
                setUser(res.data);
            } catch (err) {
                logout();
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="home-page">

            <h2 className="home-title">Welcome to ParkEase</h2>

            {/* ACTION CARDS */}
            <div className="home-actions-large">

                <div
                    className="home-card violet-outline"
                    onClick={() => setShowProfile(!showProfile)}
                >
                    <h3>My Profile</h3>
                    <p>View your personal & vehicle details</p>
                </div>

                <div
                    className="home-card violet-outline"
                    onClick={() => navigate("/parking-areas")}
                >
                    <h3>Book Parking Slot</h3>
                    <p>Find and book available parking slots</p>
                </div>

            </div>

            {/* PROFILE DETAILS */}
            {showProfile && (
                <div className="profile-section">
                    <h3>Profile Details</h3>

                    <div className="profile-row">
                        <b>Name:</b> {user.name}
                    </div>
                    <div className="profile-row">
                        <b>Email:</b> {user.email}
                    </div>
                    <div className="profile-row">
                        <b>Phone:</b> {user.phoneNumber}
                    </div>
                    <div className="profile-row">
                        <b>Vehicle:</b> {user.vehicleType} - {user.vehicleNumber}
                    </div>
                </div>
            )}

        </div>
    );
}

export default HomePage;
