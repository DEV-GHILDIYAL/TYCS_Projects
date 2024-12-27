import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // For X-axis
  LinearScale,   // For Y-axis
  Tooltip,
  Legend
} from "chart.js";
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({ noOfStudents, noOfProjects, attendanceToday, pendingReviews, onExport, onAddStudent }) => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Projects Uploaded",
        data: [5, 12, 8, 15, 10, 20],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container redesigned">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="button primary" onClick={onExport}>
            Export Data
          </button>
          <button className="button secondary" onClick={onAddStudent}>
            Add Student
          </button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{noOfStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Projects Uploaded</h3>
          <p className="stat-number">{noOfProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Attendance Today</h3>
          <p className="stat-number">
            {attendanceToday.present} Present / {attendanceToday.absent} Absent
          </p>
        </div>
        <div className="stat-card">
          <h3>Pending Reviews</h3>
          <p className="stat-number">{pendingReviews}</p>
        </div>
      </div>

      <section className="chart-section">
        <h2>Projects Uploaded Over Time</h2>
        <div className="chart-wrapper">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
