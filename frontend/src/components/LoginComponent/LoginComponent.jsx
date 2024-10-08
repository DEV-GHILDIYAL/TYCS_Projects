import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

const LoginComponent = ({ setActiveTab  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/login`, {
      // const response = await fetch("https://tycs-projects-backend-bnlr.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true); // Ensure this is stored
        toast.success("Login successful!", {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
        window.location.reload();
        setTimeout(() => {
          setActiveTab("Home"); 
          navigate("/");
        }, 1000);
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Login failed");
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="toggle-link">
          Don't have an account?{" "}
          <button type="button" onClick={() => setActiveTab("register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
