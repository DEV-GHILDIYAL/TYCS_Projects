//just writing
import Project from "../models/projectModel.js";
import Session from "../models/sessionModel.js";

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
        select: "department year batch rollno name", // Fetch only required fields
      });
      console.log("project from sessioncontroller",projects)
      if (!projects.length) {
        return res
          .status(404)
          .json({ message: "No projects found in the database." });
      }
  
      // Filter projects based on criteria
      const filteredProjects = projects.filter((projectData) => {
        console.log("project data session controller",projectData)
        const user = projectData.userId;
        console.log("user in filteredProjects",user)

        return (
          user &&
          user.department === department &&
          user.year === year &&
          user.batch === batch &&
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
  