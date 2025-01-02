const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
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

module.exports = mongoose.model('Attendance', AttendanceSchema);
