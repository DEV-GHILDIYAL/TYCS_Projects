import React, { useState } from "react";
import "./CreateSessionForm.css";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

const CreateSessionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department: "",
    year: "",
    projectNumber: "",
    batch: "",
    date: "",
    sessionNo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createSession = async() => {
    //backend call
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/admin/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // Required to include cookies
        }
      );
      const data = await response.json(); // Parse response JSON
      console.log("Server response createsessionform:", data); // Debug response

      if (response.ok) {
        setFormData({
          department: "",
          year: "",
          projectNumber: "",
          batch: "",
          date: "",
          sessionNo: "",
        });

        toast.success("Session added!", {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
      } else {
        toast.error("Session number is already used", {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Failed to add session. Please try again!");
      toast.error("Failed to add student. Please try again!", {
        position: "top-right",
        theme: "dark",
        transition: Slide,
        autoClose: 1000,
      });
    }
    navigate('/management/attendance')

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Session Created:", formData);
    // Reset form fields after submission
  };

  return (
    <form className="create-session-form" onSubmit={handleSubmit}>
      <h2>Create Session</h2>

      <label>
        Department:
        <select
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
        </select>
      </label>

      <label>
        Year:
        <select
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>
      </label>

      <label>
        Project Number:
        <select
          name="projectNumber"
          value={formData.projectNumber}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="Project1">Project 1</option>
          <option value="Project2">Project 2</option>
        </select>
      </label>

      <label>
        Batch:
        <select
          name="batch"
          value={formData.batch}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="Batch1">Batch 1</option>
          <option value="Batch2">Batch 2</option>
          <option value="Batch3">Batch 3</option>
        </select>
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Session No:
        <select
          name="sessionNo"
          value={formData.sessionNo}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="Session1">Session 1</option>
          <option value="Session2">Session 2</option>
          <option value="Session3">Session 3</option>
          <option value="Session4">Session 4</option>
          <option value="Session5">Session 5</option>
          <option value="Session6">Session 6</option>
        </select>
      </label>

      <button onClick={createSession} type="submit">Create Session</button>
    </form>
  );
};

export default CreateSessionForm;