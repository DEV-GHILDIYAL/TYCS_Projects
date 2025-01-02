import React, { useState,useEffect } from "react";
import "./CreateAttendanceSession.css";
import EventDetailsForm from "../CreateEventForm/EventDetailsFrom";
import { toast, Slide } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const CreateAttendanceSession = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/fetchsession', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if needed
        });
        const data = await response.json();
        console.log('data from createattendancesession',data.session)
        if (response.ok) {
          setSessions(data.session || []); 
        }
      } catch (error) {
        console.error("Failed to fetch Sessions:", error);
        toast.error("Failed to fetch Sessions. Please try again!", {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    };

    fetchSession();
  }, []); 

  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionData, setEditingSessionData] = useState({});
  const [loading, setLoading] = useState(false); // State for loading
  const [showHeader, setShowHeader] = useState(true); // New state for header visibility

  // const handleEdit = async (sessionId) => {
  //   const sessionToEdit = sessions.find((session) => session._id === sessionId);
  //   // setEditingSessionId(sessionId);
  //   // setEditingSessionData(sessionToEdit);
  //   setShowHeader(false); // Hide the header when editing
  // };
  const handleView = async (sessionId) => {
    const sessionToView = sessions.find((session) => session._id === sessionId);
    if (sessionToView) {
      console.log("handle view",sessionToView)
      navigate("/management/attendance",{state:{ data: null,sessionToView},})
    }
  };

  const handleDelete = async (sessionId) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session._id !== sessionId)
    );
    const response = await fetch('http://localhost:4000/admin/deletesession', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },body:JSON.stringify({ sessionId }),

      credentials: "include", // Include cookies if needed
    });
    toast.success("Session deleted!", { autoClose: 1000 });
    console.log("Response",response)
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
                      <h3 className="create-attendance-session-title">{session.sessionNo}</h3>
                    </div>
                    <div className="session-card-body">
                      <p><strong>Department:</strong> {session.department}</p>
                      <p><strong>Year:</strong> {session.year}</p>
                      <p><strong>Project Number:</strong> {session.project}</p>
                    </div>
                    <div className="session-card-footer">
                    <button
                        className="create-attendance-session-view-button"
                        onClick={() => handleView(session._id)}
                      >
                        View
                      </button>
                      {/* <button
                        className="create-attendance-session-edit-button"
                        onClick={() => handleEdit(session._id)}
                      >
                        Edit
                      </button> */}
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