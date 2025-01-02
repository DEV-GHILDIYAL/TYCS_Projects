import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendance: [
        {
            date: { type: Date, required: true },
            status: { type: String, enum: ['Present', 'Absent'], required: true },
            sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
        },
    ],
    totalPresent: { type: Number, default: 0 }, // Pre-aggregated count of Present days
    totalAbsent: { type: Number, default: 0 },  
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;