import mongoose  from 'mongoose';
import bcrypt  from 'bcryptjs';
// const jwt = require('jsonwebtoken');

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
        default: process.env.DefaultPassword, // This default password should ideally be removed or handled differently for security.
        required: true,
    },
    role: { type: String, enum: ['Admin', 'Student'], required: true },
    verifyOtp: { type: String, default:''},
    verifyOtpExpireAt: { type: Number, default:0},
    isAccountVerified:{type: Boolean, default:false},
    resetOtp: { type: String, default:''},
    resetOtpExpireAt: { type: Number, default:0},
},{ timestamps: true });

const User = mongoose.model('User', UserSchema);
// module.exports = User;
export default User;
