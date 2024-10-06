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

const UserProject = async(req,res)=>{
    try {
        const data = await Payment.find({ userId: req.user.id })
        res.status(200).json({ message: 'Successfully fetched you project', data });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Error fetching your project',error})
    }
}

const addProject = async (req, res) => {
    try {
        const { name, rollno,description,title,category,deployed,future,github,twitter,linkedin,instagram } = req.body;

        // const project = await Project.findOne({  userId: req.user.id });
        // if (project) {
        //     return res.status(409).json({ message: 'Project already exists' });
        // }

        const newP = new Project({
            // userId: req.user.id, 
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
            { name, rollno,description,category,deployed,title,future,github,twitter,linkedin,instagram },
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
        const project = await Project.findById({ _id: req.params.id, userId: req.user.id });

        if (!project) {
            return res.status(404).json({ message: 'project not found' });
        }

        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log('Error deleting project', error);
        return res.status(500).json({ message: 'Error deleting project ', error });
    }
};

module.exports = { fetchProjects, addProject, updateProject, deleteProject,UserProject};
