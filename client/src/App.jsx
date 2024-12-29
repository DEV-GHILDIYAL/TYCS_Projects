import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import SideBar from "./components/Sidebar/SideBar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SetPassword from "./components/SetPassword/SetPassword";
import MyProjects from "./components/MyProjects/MyProjects";
import AdminAttendance from "./components/AttendanceManagement/AdminAttendance";
import ProjectManagement from "./components/ProjectManagement/ProjectManagement";
// import SetPass from './components/SetPassword/SetPass';
import StudentManagement from "./components/StudentManagement/StudentManagement";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import EventDetailsForm from "./components/CreateEventForm/EventDetailsFrom";
import OtpInput from "./components/OtpInput/OtpComponent";
import AddStudent from "./components/AddStudent/AddStudent";
import CreateAttendanceSession from "./components/CreateAttendanceSession/CreateAttendanceSession";

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
      <SideBar>
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
          
          <Route path="/management/create-attendance" element={<CreateAttendanceSession />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/management/attendance" element={<AdminAttendance />} />
          <Route path="/management/projects" element={<ProjectManagement />} />
          {/* FOR ALL */}
          <Route path="/about-us" element={<About />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<SetPassword />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/otp" element={<OtpInput />} />

          {/* <Route path="/auth/setpassword/:email/:ltoken" element={<SetPass />} /> */}
          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
  );
}

export default App;
