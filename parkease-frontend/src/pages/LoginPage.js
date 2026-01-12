import { useState } from "react";
import api from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password
            });

            setToken(res.data.token);
            navigate("/user");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="user-login-container">
            <div className="user-login-card">
                <h2>User Login</h2>
                <p className="login-subtitle">
                    Sign in to manage your parking bookings
                </p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
