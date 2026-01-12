import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { setToken } from "../../utils/auth";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const res = await api.post("/auth/login", {
            email,
            password
        });

        setToken(res.data.token);
        navigate("/admin/dashboard");
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2>Admin Login</h2>
                <p className="login-subtitle">
                    Sign in to access the admin panel
                </p>

                <form onSubmit={login}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
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
