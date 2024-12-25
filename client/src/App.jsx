import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/AdminPages/Dashboard";
import { Home } from "./pages/Home";
import About from "./pages/About";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SetPassword from "./components/SetPassword/SetPassword";
import MyProjects from "./components/MyProjects/MyProjects";
import AdminAttendance from "./components/AttendanceManagement/AdminAttendance";
import ProjectManagement from "./components/ProjectManagement/ProjectManagement";

import StudentManagement from "./components/StudentManagement/StudentManagement";
function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          {/* NORMAL USER */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/my-projects" element={<MyProjects />} />
          {/* ADMIN USER */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/management/students" element={<StudentManagement />} />
          <Route path="/management/attendance" element={<AdminAttendance />} />
          <Route path="/management/projects" element={<ProjectManagement />} />
          {/* FOR ALL */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<SetPassword />} />


          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
