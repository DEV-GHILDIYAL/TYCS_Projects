import mongoose  from 'mongoose';

const UserSchema = new mongoose.Schema({
    rollNo:{
      type:Number,
      required:true,
      unique:true,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
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
        default:"fdljkasfhdflijkashfld",
        required: true,
    },
    role: { type: String, enum: ['admin', 'student'],required:true },
    department:{type:String, enum: ['CS','IT']},
    phoneNo:{type:Number,},
    batch:{type:String,},
    year:{type:String,},
    resetOtp: { type: String, default:''},
    resetOtpExpireAt: { type: Number, default:0},
    //add attendance object and fileds like no of days present
},{ timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
