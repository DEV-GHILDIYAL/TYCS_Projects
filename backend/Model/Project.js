const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        // required: true 
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    rollno:{
        type: Number,
        required:true,
        unique:true,
    },title:{type:String,required:true},
    description: {
        type: String,
        required: true,
    },
    category:{
        type:String,
        required:true,
    },
    deployed:{
        type:String,
        required:true,
    },
    future:{
        type:String,
        required:true,
    },
    github:{type:String,required:true},
    twitter:{type:String,},
    linkedin:{type:String},
    instagram:{type:String,},
    
})

const Project = mongoose.model('Project',ProjectSchema)
module.exports = Project