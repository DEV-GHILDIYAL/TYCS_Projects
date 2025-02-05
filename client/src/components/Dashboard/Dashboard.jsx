import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Dashboard.css'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(1);
  const [currentSession, setCurrentSession] = useState(1);

  // Sample data - replace with your actual data
  const projectData = {
    1: {
      totalStudents: 150,
      noOfStudents: 75,
      projectsUploaded: 60,
      projectsNotUploaded: 15,
      totalSessions: 3,
      sessions: {
        1: { present: 65, absent: 10 },
        2: { present: 70, absent: 5 },
        3: { present: 68, absent: 7 }
      }
    },
    2: {
      totalStudents: 150,
      noOfStudents: 85,
      projectsUploaded: 75,
      projectsNotUploaded: 10,
      totalSessions: 3,
      sessions: {
        1: { present: 80, absent: 5 },
        2: { present: 75, absent: 10 },
        3: { present: 78, absent: 7 }
      }
    }
  };

  const currentProjectData = projectData[currentProject];

  // Sample data for the charts
  const attendanceData = Object.entries(currentProjectData.sessions).map(([session, data]) => ({
    session: `Session ${session}`,
    present: data.present,
    absent: data.absent
  }));

  const recentUploads = [
    { student: "John Doe", project: "Project Analysis", date: "2025-02-05" },
    { student: "Jane Smith", project: "Data Visualization", date: "2025-02-04" },
    { student: "Mike Johnson", project: "UI Design", date: "2025-02-03" }
  ];

  const switchProject = (direction) => {
    if (direction === 'next' && currentProject < 2) {
      setCurrentProject(prev => prev + 1);
    } else if (direction === 'prev' && currentProject > 1) {
      setCurrentProject(prev => prev - 1);
    }
  };

  const handleExport = () => {
    console.log("Exporting data...");
    navigate('/export-data');
  };
  const handleAddStudent = () => {
    navigate("/add-student"); // Navigate to the add-student page when the button is clicked
  };
  const switchSession = (direction) => {
    if (direction === 'next' && currentSession < currentProjectData.totalSessions) {
      setCurrentSession(prev => prev + 1);
    } else if (direction === 'prev' && currentSession > 1) {
      setCurrentSession(prev => prev - 1);
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="button primary" onClick={handleExport}>
            Export Data
          </button>
          <button className="button secondary" onClick={handleAddStudent}>
            Add Student
          </button>
        </div>
      </header>

      {/* Project Selector */}
      <div className="project-selector">
        <button 
          onClick={() => switchProject('prev')} 
          disabled={currentProject === 1}
          className="nav-button"
        >
          <ChevronLeft />
        </button>
        <h2 className="project-title">Project {currentProject}</h2>
        <button 
          onClick={() => switchProject('next')} 
          disabled={currentProject === 2}
          className="nav-button"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-value">{currentProjectData.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Students in Project</h3>
          <p className="stat-value">{currentProjectData.noOfStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Projects Uploaded</h3>
          <p className="stat-value">{currentProjectData.projectsUploaded}</p>
        </div>
        <div className="stat-card">
          <h3>Projects Not Uploaded</h3>
          <p className="stat-value">{currentProjectData.projectsNotUploaded}</p>
        </div>
      </div>

      {/* Session Container */}
      <div className="session-container">
        <h2 className="section-title">Session Attendance</h2>
        <div className="session-nav">
          <button 
            onClick={() => switchSession('prev')} 
            disabled={currentSession === 1}
            className="nav-button"
          >
            <ChevronLeft />
          </button>
          <h3 className="session-title">Session {currentSession}</h3>
          <button 
            onClick={() => switchSession('next')} 
            disabled={currentSession === currentProjectData.totalSessions}
            className="nav-button"
          >
            <ChevronRight />
          </button>
        </div>
        
        <div className="attendance-stats">
          <div className="attendance-stat">
            <p className="label">Present</p>
            <p className="value present">
              {currentProjectData.sessions[currentSession].present}
            </p>
          </div>
          <div className="attendance-stat">
            <p className="label">Absent</p>
            <p className="value absent">
              {currentProjectData.sessions[currentSession].absent}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-container">
          <h2 className="section-title">Attendance Trend</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#28a745" />
                <Line type="monotone" dataKey="absent" stroke="#dc3545" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h2 className="section-title">Project Completion Status</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{
                name: 'Projects',
                uploaded: currentProjectData.projectsUploaded,
                notUploaded: currentProjectData.projectsNotUploaded
              }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uploaded" fill="#28a745" name="Uploaded" />
                <Bar dataKey="notUploaded" fill="#dc3545" name="Not Uploaded" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="table-container">
        <h2 className="section-title">Latest Project Uploads</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Project</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentUploads.map((upload, index) => (
              <tr key={index}>
                <td>{upload.student}</td>
                <td>{upload.project}</td>
                <td>{upload.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;