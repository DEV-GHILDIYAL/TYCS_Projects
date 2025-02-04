import userModel from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Session from "../models/sessionModel.js";
import Attendance from "../models/attendModel.js";

export const addstudent = async (req, res) => {
  const { email, name, rollNo, batch, role, department, year } = req.body;
  try {
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      console.error("User exist with this email:", email);
      return res.status(401).json({ message: "Email exist" });
    }

    const newS = new userModel({
      name,
      email,
      rollNo,
      batch,
      department,
      year,
      role,
    });

    await newS.save();
    res.status(201).json({ message: "Student added", newS });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Unable to add Student" });
  }
};
// export const attendanceMark = async (req, res) => {
//   try {
//     const { studentId, date, status, sessionId } = req.body;

//     // Validate input
//     if (!studentId || !date || !status || !sessionId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Convert the string to a Date object
//     const formattedDate = new Date(date);  // Ensure date is in a valid format

//     // Check if attendance is already marked for this student on the same date and session
//     const existingAttendance = await Attendance.findOne({
//       studentId,
//       "attendance.sessionId": sessionId,
//       "attendance.date": formattedDate,  // Compare with the Date object
//     });

//     if (existingAttendance) {
//       return res.status(400).json({
//         error: "Attendance for this student has already been marked for this session and date.",
//       });
//     }

//     // Update the existing document or create a new one
//     const updateResult = await Attendance.updateOne(
//       { studentId },
//       {
//         $push: {
//           attendance: { date: formattedDate, status, sessionId },
//         },
//       },
//       { upsert: true }
//     );

//     res.status(200).json({
//       message: "Attendance marked successfully",
//       result: updateResult,
//     });
//   } catch (error) {
//     console.error("Error updating attendance:", error);
//     res.status(500).json({ message: "Failed to mark attendance" });
//   }
// };

export const attendanceMark = async (req, res) => {
  try {
    const { studentId, date, status, sessionId } = req.body;

    // Validate input
    if (!studentId || !date || !status || !sessionId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert the status to match enum format (capitalize first letter)
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(); 

    // Check if the provided status is valid
    if (!["Present", "Absent"].includes(formattedStatus)) {
      return res.status(400).json({ error: "Invalid status value. Use 'Present' or 'Absent'." });
    }

    // Convert date to a Date object
    const formattedDate = new Date(date);

    // Find the student attendance record
    const studentAttendance = await Attendance.findOne({ studentId });

    if (studentAttendance) {
      // Check if attendance is already marked for the same date and session
      const existingEntry = studentAttendance.attendance.find(
        (entry) =>
          entry.sessionId.toString() === sessionId &&
          entry.date.toISOString().split("T")[0] === formattedDate.toISOString().split("T")[0]
      );

      if (existingEntry) {
        return res.status(400).json({ error: "Attendance already marked for this session and date." });
      }

      // Update existing attendance record
      const updatedAttendance = await Attendance.findOneAndUpdate(
        { studentId },
        {
          $push: { attendance: { date: formattedDate, status: formattedStatus, sessionId } },
          $inc: { [formattedStatus === "Present" ? "totalPresent" : "totalAbsent"]: 1 }
        },
        { new: true }
      );

      return res.status(200).json({ message: "Attendance updated successfully", data: updatedAttendance });
    } else {
      // Create new attendance record
      const newAttendance = new Attendance({
        studentId,
        attendance: [{ date: formattedDate, status: formattedStatus, sessionId }],
        totalPresent: formattedStatus === "Present" ? 1 : 0,
        totalAbsent: formattedStatus === "Absent" ? 1 : 0,
      });

      await newAttendance.save();
      return res.status(201).json({ message: "Attendance created successfully", data: newAttendance });
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

//NEW
// Route: /admin/attendance/status
// New function for getAttendanceStatus
export const getAttendanceStatus = async (req, res) => {
  try {
    const { studentId, date, sessionId } = req.body;

    if (!studentId || !date || !sessionId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert date string to Date object for accurate comparison
    const formattedDate = new Date(date);

    // Fetch attendance record for the student
    const attendance = await Attendance.findOne({
      studentId,
      "attendance.date": formattedDate,  // Match the exact date
      "attendance.sessionId": sessionId,
    });

    if (!attendance) {
      return res.status(404).json({ status: null });
    }

    // Find the specific attendance record for the student on that date and session
    const record = attendance.attendance.find(
      (att) =>
        new Date(att.date).toDateString() === formattedDate.toDateString() &&
        att.sessionId.toString() === sessionId
    );

    if (record) {
      return res.status(200).json({ status: record.status });
    } else {
      return res.status(404).json({ status: null });
    }
  } catch (error) {
    console.error("Error fetching attendance status:", error);
    res.status(500).json({ error: "Failed to fetch attendance status" });
  }
};

//creating sesssion
export const createSession = async (req, res) => {
  const { sessionNo, date, batch, project, department, year } = req.body;

  // Validate required fields
  if (!department || !year || !project || !batch || !date || !sessionNo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch and filter projects with populated user data
    const existingSession = await Session.findOne({
      department,
      year,
      project,
      batch,
      date,
      sessionNo,
    });

    if (existingSession) {
      return res.status(400).json({ message: "Session already exists." });
    }

    
    // Fetch and filter projects with populated user data
    const projects = await Project.find().populate({
      path: "userId", // Populate the user details
      select: "department year batch rollNo name", // Fetch only required fields
    });

    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No projects found in the database." });
    }

    // Filter projects based on criteria
    const filteredProjects = projects.filter((projectData) => {
      const user = projectData.userId;
      return (
        user &&
        user.department === department &&
        user.year === year &&
        (batch === "All" || user.batch === batch) && // Handle 'All' or specific batch
        projectData.project === project // Match the provided project
      );
    });

    if (!filteredProjects.length) {
      return res
        .status(404)
        .json({ message: "No projects match the given criteria." });
    }

    // Prepare student data from filtered projects
    const studentData = filteredProjects.map((projectData) => ({
      rollNo: projectData.userId.rollNo,
      name: projectData.userId.name,
      projectName: projectData.project, // Assuming projectData has 'project' field
      email: projectData.userId.email || null, // Include additional fields if necessary
      status: "Absent", // Default status
    }));

    // Create a new session
    const newSession = new Session({
      department,
      year,
      project,
      batch,
      date,
      sessionNo,
      students: studentData,
    });

    // Save the session
    await newSession.save();

    // Return success response
    res.status(201).json({ message: "Session added successfully", session: newSession });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session", error });
  }
};
 
export const getstudentsdata = async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch all users from the database
    if (users.length === 0) {
      // Check if the array is empty
      console.error("No users found");
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "Students fetched", data: users });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Unable to fetch students", error });
  }
};

export const fetchSession = async (req, res) => {
  try {
    const session = await Session.find(); // Fetch all users from the database
    if (session.length === 0) {
      console.error("No Session found");
      return res.status(404).json({ message: "No Session found" });
    }

    res.status(200).json({ message: "Session fetched", session });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Unable to fetch sessions", error });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await Session.findByIdAndDelete(sessionId);

    if (!session) {
      return res
        .status(404)
        .json({ message: "No session found with the given ID" });
    }

     // Now, delete all attendance records associated with this session
     const deletedAttendance = await Attendance.updateMany(
      { 'attendance.sessionId': sessionId }, // Find all attendance records with this sessionId
      { $pull: { attendance: { sessionId } } } // Remove the sessionId from the attendance array
    );

    // If no attendance records were updated, return a message
    if (deletedAttendance.modifiedCount === 0) {
      return res.status(404).json({ message: "No attendance records found for this session" });
    }

    // Return success message
    res.status(200).json({
      message: "Session and associated attendance records deleted successfully",
      session,
      deletedAttendanceCount: deletedAttendance.modifiedCount,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Unable to fetch sessions", error });
  }
};

export const getprojectdata = async (req, res) => {
  try {
    const users = await Project.find(); // Fetch all users from the database
    if (users.length === 0) {
      // Check if the array is empty
      console.error("No projects found");
      return res.status(404).json({ message: "No project found" });
    }

    res.status(200).json({ message: "Projects fetched", data: users });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Unable to fetch Projects", error });
  }
};
