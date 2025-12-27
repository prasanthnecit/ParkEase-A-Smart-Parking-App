import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        vehicleType: "",
        vehicleNumber: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/signup", form);
            alert("Signup successful. Please login.");
            navigate("/login");
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Signup</h2>

            <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
            <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
            <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} /><br /><br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br /><br />
            <input name="vehicleType" placeholder="Vehicle Type" onChange={handleChange} /><br /><br />
            <input name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} /><br /><br />

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default SignupPage;
