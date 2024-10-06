import React, { useState } from "react";
import "./SetPassword.css";
import { toast } from "react-toastify";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const SetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSetpass = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Provide email!", { autoClose: 1000 });
      return;
    }

    // Example regex for G.N. Khalsa email validation
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@gnkhalsa\.edu\.in$/;
    // if (!emailRegex.test(email)) {
    if (!email) {
      toast.error("Please enter a valid G.N. Khalsa email!", { autoClose: 1000 });
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/auth/setpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const checkdata = await response.json();

      if (response.ok && checkdata.status === "Email sent") {
        toast.success("Check your email!", { autoClose: 1000 });
        setEmail(""); // Clear email field
      } else {
        toast.error(checkdata.status || "Email does not exist!", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error during email sending:", error);
      toast.error("An error occurred while sending the email. Please try again.", { autoClose: 1000 });
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <h2>Set Password</h2>
        <form onSubmit={handleSetpass}>
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
          <button type="submit" className="login-button">
            {"Send Email"}
            <MailOutlineIcon />
          </button>
        </form>
        <p className="toggle-link">Already have a password? Go to Login</p>
      </div>
    </div>
  );
};

export default SetPassword;
