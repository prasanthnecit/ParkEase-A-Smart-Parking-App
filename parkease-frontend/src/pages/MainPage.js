import { useNavigate } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            {/* Hero Section */}
            <section className="hero">
                <h1>ParkEase</h1>
                <p className="hero-subtitle">
                    A smart parking management system to book slots effortlessly,
                    manage availability in real time, and reduce parking chaos.
                </p>

                <div className="hero-buttons">
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
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature-card">
                    <h3>🚗 Easy Slot Booking</h3>
                    <p>View real-time availability and book parking slots instantly.</p>
                </div>

                <div className="feature-card">
                    <h3>🔐 Secure Authentication</h3>
                    <p>JWT-based authentication ensures secure access for users and admins.</p>
                </div>

                <div className="feature-card">
                    <h3>📊 Admin Control</h3>
                    <p>Admins can manage parking areas, slots, and monitor usage statistics.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2026 ParkEase. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default MainPage;
