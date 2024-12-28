import Project from "../models/projectModel.js";
import userModel from '../models/userModel.js';

export const getUserData = async (req, res)=>{
    try {
        const {userId} = req.body;
  
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
  
        res.json({
            success: true,
            userData:{
                // name: user.name,
                rollno:user.rollNo,
                department:user.department,
                batch:user.batch,
                email:user.email,
                phoneno:user.phoneNo,
            }
        });
  
    } catch (error) {
        res.json({success: false, error: error.message});
    } 
}

export const fetchProjects = async (req, res) => {
    try {
        const data = await Project.find()
        res.status(200).json({ message: 'Successfully fetched all the projects', data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

export const UserProject = async(req,res) => {
    try {
        const project = await Project.find({ userId: req.user.id });
        console.log(project)
        if (!project) {
            return res.status(404).json({ message: 'No project found for this user.' });
        }
        res.status(200).json({ message: 'Successfully fetched your project', data: project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching your project', error });
    }
};


export const addProject = async (req, res) => {
    try {
        const main = req.user.id;
        const user = await userModel.findById(main);
        const existingProject = await Project.findOne({ userId: req.user.id }); 
        if (existingProject) {
            return res.status(409).json({ message: 'You can only create one project.' });
        }
        const email = user.email;

        // console.log("email from addproejct usercontroller",emailhere);
        const { name, rollno,description,title,category,project,batch,deployed,future,github,twitter,linkedin,instagram } = req.body;
        const newP = new Project({
            userId: req.user.id, 
            name,
            rollno,description,category,title,deployed,project,batch,twitter,email,linkedin,future,github,instagram
        });
        
        await newP.save();
        res.status(201).json({ message: 'New Project added', newP });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding Project', error });
    }
};


export const updateProject = async (req, res) => {
    try {
        const { name, rollno,description,category,title,deployed,projectSem,batch,future,github,twitter,linkedin,instagram } = req.body;
        const updateProject = await Project.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user._id }, 
            {...req.body},
            { new: true, runValidators: true } 
        );

        if (!updateProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', updateProject });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating project', error });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, userId: req.user.id }); // Ensure the project belongs to the user
        if (!project) {
            return res.status(404).json({ message: 'Project not found or does not belong to this user.' });
        }

        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log('Error deleting project', error);
        return res.status(500).json({ message: 'Error deleting project', error });
    }
};
