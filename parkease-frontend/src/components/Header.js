import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import "./Header.css";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
            <h2 className="logo" onClick={() => navigate("/")}>
                ParkEase
            </h2>

            {isAuthenticated() && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </header>
    );
}

export default Header;
