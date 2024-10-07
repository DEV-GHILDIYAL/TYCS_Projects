const Project = require('../Model/Project');


const fetchProjects = async (req, res) => {
    try {
        const data = await Project.find()
        res.status(200).json({ message: 'Successfully fetched all the projects', data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

const UserProject = async(req,res) => {
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


const addProject = async (req, res) => {
    try {

        const existingProject = await Project.findOne({ userId: req.user.id }); 
        if (existingProject) {
            return res.status(409).json({ message: 'You can only create one project.' });
        }

        const { name, rollno,description,title,category,deployed,future,github,twitter,linkedin,instagram } = req.body;
        const newP = new Project({
            userId: req.user.id, 
            name,
            rollno,description,category,title,deployed,twitter,linkedin,future,github,instagram
        });
        
        await newP.save();
        res.status(201).json({ message: 'New Project added', newP });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding Project', error });
    }
};


const updateProject = async (req, res) => {
    try {
        const { name, rollno,description,category,title,deployed,future,github,twitter,linkedin,instagram } = req.body;
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

const deleteProject = async (req, res) => {
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

module.exports = { fetchProjects, addProject, updateProject, deleteProject,UserProject};
