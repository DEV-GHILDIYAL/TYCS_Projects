import React, { useState } from "react";
import "./CreateAttendanceSession.css";
import EventDetailsForm from "../CreateEventForm/EventDetailsFrom";
import { toast } from "react-toastify"; // Import toast for notifications
import { NavLink } from "react-router-dom";

const CreateAttendanceSession = () => {
  const [sessions, setSessions] = useState([
    {
      _id: "1",
      title: "Session 1",
      department: "CS",
      year: "2024-2025",
      projectNumber: "1",
    },
    {
      _id: "2",
      title: "Session 2",
      department: "IT",
      year: "2023-2024",
      projectNumber: "2",
    },
    {
      _id: "3",
      title: "Session 3",
      department: "CS",
      year: "2025-2026",
      projectNumber: "1",
    },
    {
      _id: "4",
      title: "Session 4",
      department: "IT",
      year: "2024-2025",
      projectNumber: "2",
    },
    {
      _id: "5",
      title: "Session 5",
      department: "CS",
      year: "2023-2024",
      projectNumber: "1",
    },
    {
      _id: "6",
      title: "Session 6",
      department: "IT",
      year: "2025-2026",
      projectNumber: "2",
    },
    {
      _id: "7",
      title: "Session 7",
      department: "CS",
      year: "2024-2025",
      projectNumber: "1",
    },
  ]);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionData, setEditingSessionData] = useState({});
  const [loading, setLoading] = useState(false); // State for loading
  const [showHeader, setShowHeader] = useState(true); // New state for header visibility

  const handleEdit = async (sessionId) => {
    const sessionToEdit = sessions.find((session) => session._id === sessionId);
    setEditingSessionId(sessionId);
    setEditingSessionData(sessionToEdit);
    setShowHeader(false); // Hide the header when editing
  };
  const handleView = async (sessionId) => {
    // TODO: Implement view session functionality
  }

  const handleDelete = async (sessionId) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session._id !== sessionId)
    );
    toast.success("Session deleted!", { autoClose: 1000 });
  };

  return (
    <div className="create-attendance-session-container">
      {/* Conditionally render the header based on showHeader state */}
      {showHeader && <h2 className="create-attendance-session-header">My Attendance Sessions</h2>}

      {/* Always display the "Create Attendance Session" button */}
      <div className="create-attendance-session-card">
        <NavLink to="/create-session" className="add-session-btn">
          +
        </NavLink>
        <p className="create-session-text">Create an Attendance Session</p>
      </div>

      
      {/* Show loading state */}
      {loading ? (
        <p>Loading sessions...</p>
      ) : (
        <>
          {/* Check if we are in edit mode */}
          {editingSessionId ? (
            <EventDetailsForm
              editingSessionId={editingSessionId}
              initialData={editingSessionData} // Pass the editing data to the form
              setEditingSessionId={setEditingSessionId}
              setShowHeader={setShowHeader} // Optionally pass function to show the header again
            />
          ) : (
            <>
              {/* Check if there are any sessions */}
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <div className="attendance-session-card" key={session._id}>
                    <div className="create-attendance-session-header">
                      <h3 className="create-attendance-session-title">{session.title}</h3>
                    </div>
                    <div className="session-card-body">
                      <p><strong>Department:</strong> {session.department}</p>
                      <p><strong>Year:</strong> {session.year}</p>
                      <p><strong>Project Number:</strong> {session.projectNumber}</p>
                    </div>
                    <div className="session-card-footer">
                    <button
                        className="create-attendance-session-view-button"
                        onClick={() => handleView(session._id)}
                      >
                        View
                      </button>
                      <button
                        className="create-attendance-session-edit-button"
                        onClick={() => handleEdit(session._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="create-attendance-session-delete-button"
                        onClick={() => handleDelete(session._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No sessions available.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CreateAttendanceSession;
