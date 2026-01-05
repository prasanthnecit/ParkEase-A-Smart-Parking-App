import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { setToken } from "../../utils/auth";

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
        <div style={{ padding: 40 }}>
            <h2>Admin Login</h2>

            <form onSubmit={login}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                /><br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /><br /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
