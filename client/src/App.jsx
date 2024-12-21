import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/AdminPages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import { Home } from "./pages/Home";
import About from "./pages/About";
import StudentManagements from "./pages/AdminPages/StudentManagements";
import AttendanceManagement from "./pages/AdminPages/AttendanceManagement";
import ProjectManagement from "./pages/AdminPages/ProjectManagement";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SetPassword from "./components/SetPassword/SetPassword";
import MyProjects from "./components/MyProjects/MyProjects";
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
          <Route path="/students-management" element={<StudentManagements />} />
          <Route path="/attendance-management" element={<AttendanceManagement />} />
          <Route path="/project-management" element={<ProjectManagement />} />
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
