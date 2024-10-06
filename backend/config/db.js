const mongoose = require('mongoose')

const connectMongo = async () =>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URL)
            console.log('Database is connected succesfully')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectMongo;

// const emails = [
//   "g22.shiwans.vaishya@gnkhalsa.edu.in",
//   "g22.dev.ghildiyal@gnkhalsa.edu.in",
//   "g22.rohan.shakesphere@gnkhalsa.edu.in",
// ];
// const emailSchema = new mongoose.Schema({
//     email: String,
//   });
//   const Email = mongoose.model('Email', emailSchema);
//   const connectMongo = async () => {
//     try {
//       await mongoose.connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('Database connected successfully');
  
//       const emailDocs = emails.map((email) => ({ email }));
  
//       const result = await Email.insertMany(emailDocs);
  
//       console.log(`${result.length} emails inserted`);
      
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };


// module.exports = connectMongo;