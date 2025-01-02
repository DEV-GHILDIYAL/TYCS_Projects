import userModel from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Session from "../models/sessionModel.js";

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

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found in the database." });
    }

    // Filter projects based on criteria
    const filteredProjects = projects.filter((projectData) => {
      const user = projectData.userId;
      return (
        user &&
        user.department === department &&
        user.year === year &&
        user.batch === batch &&
        projectData.project === project // Match the provided project
      );
    });

    if (!filteredProjects.length) {
      return res.status(404).json({ message: "No projects match the given criteria." });
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

    res.status(200).json({ message: "Session fetched",session });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Unable to fetch sessions", error });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const {sessionId} = req.body
    const session = await Session.findByIdAndDelete(sessionId); // Fetch all users from the database
    if (session.length === 0) {
      console.error("No Session found");
      return res.status(404).json({ message: "No Session found" });
    }

    res.status(200).json({ message: "Session fetched",session });
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
