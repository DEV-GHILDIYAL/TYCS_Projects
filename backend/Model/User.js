const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    rollNo:{
      type:Number,
      required:true,
      unique:true,
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
        default: "dfajhkldfhadsjkhfdlasfhl", // This default password should ideally be removed or handled differently for security.
        required: true,
    },
    // Uncomment and modify as needed for your application
    // type: {
    //     type: String,
    //     enum: ["user", "admin"],
    //     required: true,
    // },
});

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, saltRound);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});

// Compare the password
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Password comparison failed:", error);
        throw new Error("Password comparison failed");
    }
};

// Generate JWT token
UserSchema.methods.generateToken = function () {
    const user = this;
    try {
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: '12hr',
        });
        console.log("token from User after loggin in",token)
        return token;
    } catch (error) {
        console.error("Token generation failed:", error);
        throw new Error("Token generation failed");
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
