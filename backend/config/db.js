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
module.exports = connectMongo;


// const students = [
//   { rollNo: 403, email: "g22.mohdanas.riyasat@gnkhalsa.edu.in" },
//   { rollNo: 404, email: "g22.mohdaman.mohdkhursheed@gnkhalsa.edu.in" },
//   { rollNo: 407, email: "g22.maskeensingh.harjitsingh@gnkhalsa.edu.in" },
//   { rollNo: 410, email: "g22.vishwajeet.barai@gnkhalsa.edu.in" },
//   { rollNo: 412, email: "g22.tanvi.ajit@gnkhalsa.edu.in" },
//   { rollNo: 413, email: "g22.mehmoodali.ashrafali@gnkhalsa.edu.in" },
//   { rollNo: 414, email: "g22.mohammedawais.abdul@gnkhalsa.edu.in" },
//   { rollNo: 415, email: "g22.sanjana.chaurasiya@gnkhalsa.edu.in" },
// ];

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
