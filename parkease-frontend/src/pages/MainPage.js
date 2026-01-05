import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <div className="main-card">
                <h1 className="main-title">ParkEase</h1>
                <p className="main-subtitle">
                    Smart Parking Management System
                </p>

                <div className="main-actions">
                    <button
                        className="btn primary"
                        onClick={() => navigate("/login")}
                    >
                        User Login
                    </button>

                    <button
                        className="btn secondary"
                        onClick={() => navigate("/signup")}
                    >
                        User Signup
                    </button>

                    <button
                        className="btn outline"
                        onClick={() => navigate("/admin/login")}
                    >
                        Admin Login
                    </button>
                </div>
            </div>
        </div>
    );
}
