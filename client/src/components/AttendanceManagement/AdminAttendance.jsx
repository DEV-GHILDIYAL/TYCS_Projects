import React, { useState, useEffect } from "react";
import "./AdminAttendance.css";
import { RowComponentForAttendance } from "../RowComponent/RowComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, sessionToView } = location.state || {};

  let main = [];
  let sessionId = null;
  let date = null;

  if (data?.session) {
    main = data.session.students;
    sessionId = data.session._id;
    date = data.session.date;
  }

  if (sessionToView) {
    main = sessionToView.students || [];
    sessionId = sessionToView._id;
    date = sessionToView.date;
  }

  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch attendance data when the component loads
  useEffect(() => {
    const fetchAttendanceStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/admin/attendance/status/${sessionId}`,
          {
            credentials: "include", // Pass cookies for authentication
          }
        );
        const data = await response.json();

        if (response.ok) {
          // Update attendanceStatus with the fetched data
          const status = main.reduce((acc, student) => {
            acc[student._id] = data.attendance[student._id] || null; // Use fetched status or null if not available
            return acc;
          }, {});

          setAttendanceStatus(status);
        } else {
          console.error("Failed to fetch attendance:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching attendance status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceStatus();
  }, [sessionId, main]);

  const handleAttendanceMarked = (studentId, status) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: status, // Update the status for the specific student
    }));
  };

  const handleSubmit = () => {
    const allMarked = Object.values(attendanceStatus).every(
      (status) => status === "present" || status === "absent" // Check if all students have been marked
    );

    if (allMarked) {
      navigate("/management/attendance-sessions");
    } else {
      toast.error("Please mark attendance for all students before submitting!");
    }
  };

  const handleBack = () => {
    navigate("/management/attendance-sessions");
  };

  const handleEdit = () => {
    toast.info("Edit functionality is not implemented yet!", {
      autoClose: 1500,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-attendance-page">
      <div className="content">
        <div className="attendance-head">
          <div className="attendance-head-left">
            <h1>Attendance Management</h1>
            <p>Here you can mark and manage attendance for students.</p>
            <p>{date}</p>
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Project Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {main.length === 0 ? (
              <tr>
                <td colSpan="5">No students found.</td>
              </tr>
            ) : (
              main.map((student, index) => (
                <RowComponentForAttendance
                  key={student._id}
                  srNo={index + 1}
                  rollNumber={student.rollNo}
                  name={student.name}
                  projectName={student.projectName}
                  sessionId={sessionId}
                  studentId={student._id}
                  date={date}
                  onAttendanceMarked={(status) =>
                    handleAttendanceMarked(student._id, status)
                  }
                />
              ))
            )}
          </tbody>
        </table>

        <div className="attendance-buttons">
          {sessionToView ? (
            <>
              <button className="attendance-student-back" onClick={handleBack}>
                Back
              </button>
              <button className="attendance-student-edit" onClick={handleEdit}>
                Edit
              </button>
            </>
          ) : (
            <button
              className="attendance-student-submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
