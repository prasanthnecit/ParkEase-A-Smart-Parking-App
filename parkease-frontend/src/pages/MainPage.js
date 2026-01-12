import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* ===== HEADER ===== */}
            <header className="landing-header">
                <div className="logo">ParkEase</div>

                <nav className="header-actions">

                    <button
                        className="btn outline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="btn outline"
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </button>

                    <button
                        className="btn primary"
                        onClick={() => navigate("/admin/login")}
                    >
                        Admin
                    </button>
                </nav>
            </header>

            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero-content">
                    <h1>
                        Smart Parking,
                        <br />
                        Made Simple
                    </h1>

                    <p>
                        ParkEase is a smart parking management system that helps
                        users find and book parking slots effortlessly while
                        giving administrators complete control and real-time
                        insights.
                    </p>
                </div>
            </section>

                    {/*<div className="hero-buttons">*/}
                    {/*    <button*/}
                    {/*        className="btn primary"*/}
                    {/*        onClick={() => navigate("/signup")}*/}
                    {/*    >*/}
                    {/*        Get Started*/}
                    {/*    </button>*/}

                    {/*    <button*/}
                    {/*        className="btn secondary"*/}
                    {/*        onClick={() => navigate("/login")}*/}
                    {/*    >*/}
                    {/*        User Login*/}
                    {/*    </button>*/}
                    {/*</div>*/}


            {/* ===== FEATURES ===== */}
            <section className="features">
                <h2>Why ParkEase?</h2>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Easy Booking</h3>
                        <p>
                            Locate and book parking slots in seconds with a
                            simple and intuitive interface.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Real-Time Availability</h3>
                        <p>
                            Always see live slot availability and avoid
                            unnecessary waiting.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Admin Control</h3>
                        <p>
                            Powerful dashboards to manage areas, slots,
                            bookings, and maintenance.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="landing-footer">
                © {new Date().getFullYear()} ParkEase. All rights reserved.
            </footer>
        </div>
    );
}
