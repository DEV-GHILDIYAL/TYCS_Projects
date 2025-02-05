import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import SideBar from "./components/Sidebar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SetPassword from "./components/SetPassword/SetPassword";
import MyProjects from "./components/MyProjects/MyProjects";
import AdminAttendance from "./components/AttendanceManagement/AdminAttendance";
import ProjectManagement from "./components/ProjectManagement/ProjectManagement";
import StudentManagement from "./components/StudentManagement/StudentManagement";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import EventDetailsForm from "./components/CreateEventForm/EventDetailsFrom";
import OtpInput from "./components/OtpInput/OtpComponent";
import AddStudent from "./components/AddStudent/AddStudent";
import CreateAttendanceSession from "./components/CreateAttendanceSession/CreateAttendanceSession";
import CreateSessionForm from "./components/CreateSessionForm/CreateSessionForm";
import { useState, useEffect } from "react";
import ExportDataComponent from "./components/ExportDataComponent/ExportDataComponent";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import MassStudentUpload from "./pages/MassStudentUpload";
import ExcelTable from "./components/ExcelTable/ExcelTable";

function App() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 800);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To manage the login state

  // Fetch user role from backend
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/user-role`, { credentials: "include" });
        const data = await response.json();
        setUserRole(data.role);
        if(data.role == "admin" || data.role == "student"){
          setIsLoggedIn(true); // Assume logged in if role is fetched
        }else{
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setIsLoggedIn(false); // Set to false if there is an error fetching role
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const dashboardData = async () => {
    // Fetch dashboard data from backend
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/dashboard`, { credentials: "include" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return null;
    }
  }
  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  const handleAddStudent = () => {
    console.log("Opening Add Student form...");
  };

  const handleLogout = () => {
    // Log out the user by clearing cookies/session, then redirect to login page
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isDesktop ? (
        <SideBar isLoggedIn={isLoggedIn} userRole={userRole}>
          <Routes>
            {/* NORMAL USER ROUTES */}
            {isLoggedIn && userRole === "student" ? (
              <>
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/create-project" element={<EventDetailsForm />} />
              </>
            ) : null}

            {/* ADMIN ROUTES (Protected) */}
            {isLoggedIn && userRole === "admin" ? (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard/>
                  }
                />
                <Route path="/table" element={<ExcelTable />} />
                <Route path="/management/students" element={<StudentManagement />} />
                <Route path="/management/attendance-sessions" element={<CreateAttendanceSession />} />
                <Route path="/create-session" element={<CreateSessionForm />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/management/attendance" element={<AdminAttendance />} />
                <Route path="/management/projects" element={<ProjectManagement />} />
                <Route path="/export-data" element={<ExportDataComponent />} />
                <Route path="/mass-student-upload" element={<MassStudentUpload/>} />
              </>
            ) : isLoggedIn && userRole !== "admin" ? (
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
            ) : null}

            {/* COMMON ROUTES */}
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<SetPassword />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/otp" element={<OtpInput />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SideBar>
      ) : (
        <>
          <Navbar />
          <Routes>
            {/* NORMAL STUDENT ROUTES */}
            {isLoggedIn && userRole === "student" ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/create-project" element={<EventDetailsForm />} />
              </>
            ) : null}

            {/* ADMIN ROUTES (Protected) */}
            {isLoggedIn && userRole === "admin" ? (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard/>
                  }
                />
                <Route path="/management/students" element={<StudentManagement />} />
                <Route path="/management/attendance-sessions" element={<CreateAttendanceSession />} />
                <Route path="/management/projects" element={<ProjectManagement />} />
                <Route path="/management/attendance" element={<AdminAttendance />} />
                <Route path="/create-session" element={<CreateSessionForm />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/export-data" element={<ExportDataComponent />} />
              </>
            ) : (
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
            )}

            {/* COMMON ROUTES */}
            <Route path="/about-us" element={<About />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<SetPassword />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/otp" element={<OtpInput />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}

    </>
  );
}

export default App;
