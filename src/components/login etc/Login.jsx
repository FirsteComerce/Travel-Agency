import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './App.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/login", { username, password })
            .then((res) => {
                if (res.data.login) {
                    navigate("/home");
                } else {
                    navigate("/register");
                }
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/register");
            });
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb">
                        <label htmlFor="username">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="username"
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn"
                        >
                            {showPassword ? "Hide" : "Show"} Password
                        </button>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <Link to="/register"><button className="btn">Register</button></Link>
                <p>Don't have an account?</p>
            </div>
        </div>
    );
};

export default Login;
