import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
    // sessionId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type:String,},
    rollNo:{
        type:Number,
        // required:true,
        // unique:true,
      },
    //   batch:{type:String,default:""},
      attendance: [
        {
            date: { type: Date, required: true },
            status: { type: String, enum: ['Present', 'Absent'], required: true },
            sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
        },
    ],
    totalPresent: { type: Number, default: 0 }, 
    totalAbsent: { type: Number, default: 0 },  
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;