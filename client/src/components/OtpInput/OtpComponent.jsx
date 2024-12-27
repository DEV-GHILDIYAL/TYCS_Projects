import { useState } from "react";
import "./OtpComponent.css";
import { useNavigate } from "react-router-dom";

const OtpInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value.length === 1 && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          className="otp-input"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
};

const OtpComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async () => {
    if (!email || !otp || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // alert(`Email: ${email}\nOTP: ${otp}\nNew Password: ${newPassword}`);
    // Add API call or validation logic here
    try {
      // const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/setpassword`, {
      // const response = await fetch("https://tycs-projects-backend-bnlr.onrender.com/auth/setpassword", {
      
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
        credentials: "include",
      });

      const checkdata = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        console.log("Registration failed", checkdata.errorMessage || checkdata.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="otp-component">
      <h1>Reset Password</h1>
      <p className="otp-description">
        Enter your registered email, the OTP sent to your email, and your new password.
      </p>

      <div className="form-group">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="otp">OTP:</label>
        <OtpInput length={6} onChange={handleOtpChange} />
      </div>

      <div className="form-group">
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          id="new-password"
          className="password-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default OtpComponent;
