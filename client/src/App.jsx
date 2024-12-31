import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import SideBar from "./components/Sidebar/SideBar";
import Navbar from "./components/Navbar/Navbar";  // Ensure Navbar is imported
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

function App() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 800);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExport = () => {
    console.log("Exporting data...");
    navigate('/export-data')
    // Add your export logic here
  };

  const handleAddStudent = () => {
    console.log("Opening Add Student form...");
    // Add your add-student logic here
  };

  return (
    <>
      {isDesktop ? <SideBar>
        <Routes>
        {/* NORMAL USER */}
        <Route path="/" element={<Home />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/create-project" element={<EventDetailsForm />} />

        {/* ADMIN USER */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              noOfStudents={200}
              noOfProjects={50}
              attendanceToday={{ present: 180, absent: 20 }}
              pendingReviews={10}
              onExport={handleExport}
              onAddStudent={handleAddStudent}
            />
          }
        />
        <Route path="/management/students" element={<StudentManagement />} />
        <Route path="/management/attendance-sessions" element={<CreateAttendanceSession />} />
        <Route path="/create-session" element={<CreateSessionForm />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/management/attendance" element={<AdminAttendance />} />
        <Route path="/management/projects" element={<ProjectManagement />} />
        
        <Route path="/export-data" element={<ExportDataComponent />} />

        {/* FOR ALL */}
        <Route path="/about-us" element={<About />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<SetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/otp" element={<OtpInput />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </SideBar> :<> <Navbar />
      <Routes>
      {/* NORMAL USER */}
      <Route path="/" element={<Home />} />
      <Route path="/my-projects" element={<MyProjects />} />
      <Route path="/create-project" element={<EventDetailsForm />} />

      {/* ADMIN USER */}
      <Route
        path="/dashboard"
        element={
          <Dashboard
            noOfStudents={200}
            noOfProjects={50}
            attendanceToday={{ present: 180, absent: 20 }}
            pendingReviews={10}
            onExport={handleExport}
            onAddStudent={handleAddStudent}
          />
        }
      />
      <Route path="/management/students" element={<StudentManagement />} />
      <Route path="/management/attendance-sessions" element={<CreateAttendanceSession />} />
      <Route path="/create-session" element={<CreateSessionForm />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/management/attendance" element={<AdminAttendance />} />
      <Route path="/management/projects" element={<ProjectManagement />} />
      <Route path="/export-data" element={<ExportDataComponent />} />

      {/* FOR ALL */}
      <Route path="/about-us" element={<About />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<SetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/otp" element={<OtpInput />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes></>}
      
    </>
  );
}

export default App;
