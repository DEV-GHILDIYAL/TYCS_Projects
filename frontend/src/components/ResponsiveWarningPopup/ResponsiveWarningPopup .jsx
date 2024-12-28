// ResponsiveWarningPopup.jsx
import React from "react";
import "./ResponsiveWarningPopup.css";

const ResponsiveWarningPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Warning: Not Responsive</h2>
        <p>This website is not responsive. We highly recommend running this website on a desktop.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ResponsiveWarningPopup;
