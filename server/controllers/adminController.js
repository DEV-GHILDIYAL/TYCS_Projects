import userModel from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Session from "../models/sessionModel.js";
import Attendance from "../models/attendModel.js";

export const addstudent = async (req, res) => {
  const { email, name, rollNo, batch, role, department, year } = req.body;
  try {
    const userExist = await userModel.find({ email: email });
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

// attendanceMark
// export const attendanceMark = async (req, res) => {
//   try {
//     console.log("BODY",req.body);
//     const { studentId, date, status, sessionId } = req.body;
//     // Validate input
//     if (!studentId || !date || !status || !sessionId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const existingAttendance = await Attendance.findOne({
//       studentId,
//       date,
//       sessionId,
//     });

//     if (existingAttendance) {
//       return res.status(400).json({
//         error: "Attendance for this student has already been marked.",
//       });
//     }

//     await Attendance.updateOne(
//       { studentId }, // Match the student
//       { $push: { attendance: { date, status, sessionId } } }, // Add to attendance array
//       { upsert: true } // Create if it doesn’t exist
//     );

//     // Create a new attendance record
//     const attendance = new Attendance({
//       studentId,
//       date,
//       status,
//       sessionId,
//     });

//     await attendance.save();

//     res.status(200).json({ message: "Attendance marked successfully" });
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

    // Check if attendance is already marked for this student, session, and date
    const existingAttendance = await Attendance.findOne({
      studentId,
      "attendance.date": date,
      "attendance.sessionId": sessionId,
    });

    if (existingAttendance) {
      return res.status(400).json({
        error: "Attendance for this student has already been marked for this session and date.",
      });
    }

    // Update the existing document or create a new one
    const updateResult = await Attendance.updateOne(
      { studentId }, // Match the student
      {
        $push: {
          attendance: { date, status, sessionId },
        },
      },
      { upsert: true } // Create if it doesn’t exist
    );

    res.status(200).json({
      message: "Attendance marked successfully",
      result: updateResult,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};



//NEW
// Route: /admin/attendance/status
export const getAttendanceStatus = async (req, res) => {
  try {
    const { studentId, date, sessionId } = req.body;

    if (!studentId || !date || !sessionId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const attendance = await Attendance.findOne({
      studentId,
      "attendance.date": date,
      "attendance.sessionId": sessionId,
    });

    if (!attendance) {
      return res.status(404).json({ status: null });
    }

    const record = attendance.attendance.find(
      (att) => att.date.toISOString() === new Date(date).toISOString() && att.sessionId.toString() === sessionId
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
    const projects = await Project.find().populate({
      path: "userId", // Populate the user details
      select: "department year batch rollNo name", // Fetch only required fields
    });
    console.log("projects from admin controller",projects)
    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No projects found in the database." });
    }

    // Filter projects based on criteria
    const filteredProjects = projects.filter((projectData) => {
      console.log("projectData inside filteredProjects from admin controller",projectData)
      const user = projectData.userId;
      console.log("user with projectData userId",user)
      return (
        user &&
        user.department === department &&
        user.year === year &&
        (batch === "All" || user.batch === batch) && // Handle 'ALL' or specific batch
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
      name: projectData.name,
      projectName: projectData.title,
      email: projectData.email || null, // Include additional fields if necessary
      status: "Absent", // Default status
    }));

    // Create a new session with the prepared student data
    const newSession = new Session({
      department,
      year,
      project,
      batch,
      date,
      sessionNo,
      students: studentData, // Add student data to the session
    });

    // Save the session to the database
    await newSession.save();

    // Return success response
    res
      .status(201)
      .json({ message: "Session added successfully", session: newSession });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session", error });
  }
};




// export const createSession = async (req, res) => {
//   const { sessionNo, date, batch, project, department, year } = req.body;

//   // Validate required fields
//   if (
//     !department?.trim() ||
//     !year?.trim() ||
//     !project?.trim() ||
//     !batch?.trim() ||
//     !date ||
//     !sessionNo?.trim()
//   ) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const projects = await Project.find()
//       .populate({
//         path: "userId",
//         select: "department year batch rollNo name",
//       })
//       .catch((err) => {
//         console.error("Error fetching projects:", err);
//         return res
//           .status(500)
//           .json({ message: "Database query failed", error: err });
//       });

//     if (!projects || !projects.length) {
//       return res
//         .status(404)
//         .json({ message: "No projects found in the database." });
//     }

//     const filteredProjects = projects.filter((projectData) => {
//       const user = projectData.userId;
//       return (
//         user &&
//         user.department === department &&
//         user.year === year &&
//         user.batch === batch &&
//         projectData.project === project
//       );
//     });

//     if (!filteredProjects.length) {
//       return res
//         .status(404)
//         .json({ message: "No projects match the given criteria." });
//     }

//     const studentData = filteredProjects.map((projectData) => ({
//       rollNo: projectData.userId?.rollNo || null,
//       name: projectData.userId?.name || "Unknown",
//       projectName: projectData.title || "No Title",
//       email: projectData.email || "No Email",
//       status: "Absent",
//     }));

//     const newSession = new Session({
//       department,
//       year,
//       project,
//       batch,
//       date,
//       sessionNo,
//       students: studentData,
//     });

//     await newSession.save().catch((err) => {
//       console.error("Error saving session:", err);
//       return res
//         .status(500)
//         .json({ message: "Failed to save session", error: err });
//     });

//     res.status(201).json({
//       message: "Session added successfully",
//       session: {
//         id: newSession._id,
//         department: newSession.department,
//         year: newSession.year,
//         project: newSession.project,
//         batch: newSession.batch,
//         date: newSession.date,
//         students: newSession.students,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating session:", error);
//     res.status(500).json({ message: "Failed to create session", error });
//   }
// };


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

    res.status(200).json({ message: "Session deleted successfully", session });
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
