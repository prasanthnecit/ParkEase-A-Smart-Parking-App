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
        <div className="user-signup-container">
            <div className="user-signup-card">
                <h2>Create Account</h2>
                <p className="signup-subtitle">
                    Create your account to book parking slots
                </p>

                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            name="name"
                            placeholder="John Doe"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            name="phoneNumber"
                            placeholder="9876543210"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Vehicle Type</label>
                        <input
                            name="vehicleType"
                            placeholder="Car / Bike"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Vehicle Number</label>
                        <input
                            name="vehicleNumber"
                            placeholder="TN 01 AB 1234"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}
