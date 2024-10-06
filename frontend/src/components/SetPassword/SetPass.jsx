import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access URL parameters
import { toast } from "react-toastify";
import "./SetPassword.css";

const SetPass = () => {
  const { email, ltoken } = useParams(); // Get email and ltoken from URL
  console.log('ltoken from params',ltoken)
  const [password, setPassword] = useState("");

  const handleSetPassword = async (e) => {
    e.preventDefault();
    
    if (!password) {
      toast.error("Please enter a new password!", { autoClose: 1000 });
      return;
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters long!", { autoClose: 1000 });
        return;
    }

    try {
      const response = await fetch(`http://localhost:5500/auth/setpassword/${email}/${ltoken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }), // Include the new password in the request body
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password set successfully!", { autoClose: 1000 });
        // Redirect to login or another page if needed
      } else {
        toast.error(data.status || "Failed to set password!", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error setting password:", error);
      toast.error("An error occurred!", { autoClose: 1000 });
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <h2>Set New Password</h2>
        <form method="post">
          <div className="input-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPass;
