const mongoose = require('mongoose');
const User = require('../Model/User');
const connectMongo = async () =>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URL)
            console.log('Database is connected succesfully')
    } catch (error) {
        console.log(error)
    }
}


// const students = [
//     {
//       rollNo: 477,
//       email: "g22.shiwans.vaishya@gnkhalsa.edu.in"
//     },
//   ];

// const connectMongo = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Connected to MongoDB");

//     const bulkOps = students.map(student => ({
//       updateOne: {
//         filter: { rollNo: student.rollNo },
//         update: { $setOnInsert: student }, // Only set if the document does not exist
//         upsert: true // Insert if the document doesn't exist
//       }
//     }));

//     const result = await User.bulkWrite(bulkOps);
//     console.log(`${result.upsertedCount} new student(s) inserted`);
//     console.log(`${result.modifiedCount} existing student(s) updated`);
//   } catch (error) {
//     console.error("Error connecting to MongoDB or updating data:", error);
//   }
// };

module.exports = connectMongo;
