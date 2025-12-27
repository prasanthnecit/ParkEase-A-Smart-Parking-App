import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import "../styles/header.css";

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!getToken();

    return (
        <header className="app-header">
            <h2 onClick={() => navigate("/")} className="logo">
                ParkEase
            </h2>

            <div className="header-actions">
                {!isLoggedIn && (
                    <>
                        <button onClick={() => navigate("/login")}>Login</button>
                        <button onClick={() => navigate("/signup")}>Signup</button>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <button onClick={() => navigate("/home")}>Home</button>
                        <button
                            className="logout-btn"
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
