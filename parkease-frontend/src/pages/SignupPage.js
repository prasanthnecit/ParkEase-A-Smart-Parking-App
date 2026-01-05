import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/signup", form);
            alert("Signup successful. Login now.");
            navigate("/login");
        } catch {
            alert("Signup failed");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create Account</h2>

                <form onSubmit={handleSignup}>
                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="vehicleType"
                        placeholder="Vehicle Type (Car / Bike)"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="vehicleNumber"
                        placeholder="Vehicle Number"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}
