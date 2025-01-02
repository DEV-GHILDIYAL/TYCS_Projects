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
  console.log("Received Data:", req.body);
  const { department, year, project, batch, date, sessionNo } = req.body;

  if (!department || !year || !project || !batch || !date || !sessionNo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newS = new Session({
      department,
      year,
      project,
      batch,
      date,
      sessionNo,
      // students,
    });

    await newS.save();
    res.status(201).json({ message: "Session added", newS });
  } catch (error) {
    console.error("Error adding Session:", error);
    res.status(500).json({ message: "Unable to add Session" });
  }
};

export const fetchingStudents = async (req, res) => {
  const { sessionNo, date, batch, projectNumber, department, year } = req.body;

  try {
    // Fetch projects and populate the userId field
    const projects = await Project.find().populate({
      path: "userId", // Populate the user details
      select: "department year batch rollNo name", // Fetch only required fields
    });

    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No projects found in the database." });
    }

    // Filter projects based on user data and project-specific criteria
    const filteredProjects = projects.filter((project) => {
      const user = project.userId;
      return (
        user && // Ensure user data exists
        user.department === department &&
        user.year === year &&
        user.batch === batch &&
        project.project === projectNumber // Check project-specific criteria
      );
    });

    if (!filteredProjects.length) {
      return res
        .status(404)
        .json({ message: "No projects match the given criteria." });
    }

    // Format the filtered data for the response
    const filteredData = filteredProjects.map((project) => ({
      projectName: project.name,
      user: {
        rollNo: project.userId.rollNo,
        name: project.userId.name,
      },
      email: project.email, // Include project-specific fields if needed
    }));

    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching student projects:", error);
    res.status(500).json({ message: "Failed to fetch projects", error });
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
