import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";

function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            "http://localhost:8080/api/auth/login",
            { email, password }
        );

        setToken(res.data.token);

        // ✅ IMPORTANT
        navigate("/admin");
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default AdminLoginPage;
