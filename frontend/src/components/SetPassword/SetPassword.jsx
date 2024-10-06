import React, { useState } from "react";
import "./SetPassword.css"
import { toast, Slide } from "react-toastify";
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const SetPassword = () => {
  const [email, setEmail] = useState("");
  
  const handleSetpass = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Provide email!", {position: "top-right",theme: "light",transition: Slide,});
      return;
    }
ˀ
    try {
      const response = await fetch(`http://localhost:5500/auth/setpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Email has been sent on your email", {position: "top-right",theme: "light",transition: Slide,});
      } else {
        console.log("Registration failed",data.errorMessage || data.message);
        toast.error("Unable to send data to server", {position: "top-right",theme: "light",transition: Slide,});
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Looks like it's not an G.N. Khalsa email!", {position: "top-right",theme: "light",transition: Slide,});
    }
  };

  return (
    <>
      <div className="login-register-container">
        <div className="login-register-card">
          <h2>Set Password</h2>
          <form onSubmit={ handleSetpass}>
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
            <button type="submit" className="login-button" >
            {"Send Email"}<MailOutlineIcon />
            </button>
          </form>
          <p className="toggle-link">
            Already have password then go an Login 
          </p>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
