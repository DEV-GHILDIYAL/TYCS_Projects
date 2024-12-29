import mongoose from 'mongoose';
import userModel from '../models/userModel.js';

// const connectDB = async ()=>{
//     mongoose.connection.on('connected', ()=>console.log('Database Connected'));

//     await mongoose.connect(process.env.MONGODB_URI);
// };

const students = [
    {
      rollNo: 477,
      email: "g22.shiwans.vaishya@gnkhalsa.edu.in",
      role:"student"
    },
    {
      rollNo: 421,
      email: "g22.dev.ghildiyal@gnkhalsa.edu.in",
      role:"student"
    },
  ];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const bulkOps = students.map(student => ({
      updateOne: {
        filter: { rollNo: student.rollNo },
        update: { $setOnInsert: student }, // Only set if the document does not exist
        upsert: true // Insert if the document doesn't exist
      }
    }));

    const result = await userModel.bulkWrite(bulkOps);
    console.log(`${result.upsertedCount} new student(s) inserted`);
    console.log(`${result.modifiedCount} existing student(s) updated`);
  } catch (error) {
    console.error("Error connecting to MongoDB or updating data:", error);
  }
};

export default connectDB;