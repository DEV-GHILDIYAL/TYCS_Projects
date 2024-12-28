import mongoose  from 'mongoose';

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
        default:"fdljkasfhdflijkashfld",
        required: true,
    },
    role: { type: String, enum: ['admin', 'student'], required: true },
    department:{type:String, enum: ['CS','IT']},
    phoneNo:{type:Number,},
    batch:{type:String,},
    resetOtp: { type: String, default:''},
    resetOtpExpireAt: { type: Number, default:0},
},{ timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
