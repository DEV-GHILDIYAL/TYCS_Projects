import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SetPassword from "./components/SetPassword/SetPassword";
import MyProjects from "./components/MyProjects/MyProjects";
import AdminAttendance from "./components/AttendanceManagement/AdminAttendance";
import ProjectManagement from "./components/ProjectManagement/ProjectManagement";
import StudentManagement from "./components/StudentManagement/StudentManagement";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
function App() {
  const handleExport = () => {
    console.log("Exporting data...");
    // Add your export logic here
  };

  const handleAddStudent = () => {
    console.log("Opening Add Student form...");
    // Add your add-student logic here
  };
  return (
    <Router>
      <SideBar>
        <Routes>
          {/* NORMAL USER */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/my-projects" element={<MyProjects />} />
          {/* ADMIN USER */}
          <Route path="/dashboard" element={<Dashboard
      noOfStudents={200}
      noOfProjects={50}
      attendanceToday={{ present: 180, absent: 20 }}
      pendingReviews={10}
      onExport={handleExport}
      onAddStudent={handleAddStudent}
    />} />
          <Route path="/management/students" element={<StudentManagement />} />
          <Route path="/management/attendance" element={<AdminAttendance />} />
          <Route path="/management/projects" element={<ProjectManagement />} />
          {/* FOR ALL */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<SetPassword />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
