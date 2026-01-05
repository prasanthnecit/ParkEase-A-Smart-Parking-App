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
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">User Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
