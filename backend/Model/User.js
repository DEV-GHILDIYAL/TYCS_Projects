const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    type:{
        type:String,
        enum:["user","admin"],
        required:true
    }
})

UserSchema.pre("save",async function (next){
    const user = this;
    if(!user.isModified("password")){
        return next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, saltRound);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
})

//Compare the password
UserSchema.methods.comparePassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
      } catch (error) {
        console.error("Password comparison failed:", error);
        throw new Error("Password comparison failed");
      }
}

UserSchema.methods.generateToken = function() {
    const user = this;
    try {
      const token = jwt.sign({ id: user._id, email: user.email,name:user.name }, process.env.JWT_SECRET_KEY, {
        expiresIn: '11h',
      });
      return token;
    } catch (error) {
      console.error("Token generation failed:", error);
      throw new Error("Token generation failed");
    }
  };

const User = mongoose.model('User',UserSchema)
module.exports = User