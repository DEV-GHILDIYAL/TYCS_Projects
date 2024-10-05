const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    rollno:{
        type: Number,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    deployedLink:{type:String,required:true},
    githubLink:{type:String,required:true},
    
})

const Project = mongoose.model('Project',ProjectSchema)
module.exports = Project