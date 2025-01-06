import mongoose from 'mongoose';
import projectModel from '../models/projectModel.js';

const projects = [
    {
        userId: "6777d0acc916ba93f8fd72cf",
        name: "om verma",
        email:"g22.om.verma@gnkhalsa.edu.in",
        iscompleted:"true",
        rollno: 404,//477
        title: "ABCDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch2",
        year:"2024-2025",//2025-2026
        department:"IT",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"
    },
    {
        userId: "6777d0acc916ba93f8fd72de",
        name: "aditya misra",
        email:"g22.aditya.mishra@gnkhalsa.edu.in",
        iscompleted:"true",
        rollno: 444,//477
        title: "ABCDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch3",
        year:"2024-2025",//2025-2026
        department:"CS",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"
    },
    {
        userId: "6777d0acc916ba93f8fd72e3",
        name: "aarav khan",
        email:"g22.aarav.khan@gnkhalsa.edu.in",
        rollno: 448,//477
        iscompleted:"true",
        title: "ABCDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch3",
        year:"2024-2025",//2025-2026
        department:"CS",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"
    },
    {
        userId: "6777d0acc916ba93f8fd72e1",
        name: "aryan gupta",
        email:"g22.aryan.gupta@gnkhalsa.edu.in",
        rollno: 418,//477
        iscompleted:"true",
        title: "ABCDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch3",
        year:"2024-2025",//2025-2026
        department:"CS",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"
    },
    {
        userId: "6777d0acc916ba93f8fd72e5",
        name: "kabir das",
        email:"g22.kabir.das@gnkhalsa.edu.in",
        rollno: 451,//477
        iscompleted:"true",
        title: "ABCDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch3",
        year:"2024-2025",//2025-2026
        department:"CS",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"
    },
    {
        userId: "6777d0acc916ba93f8fd72e6",
        name: "om das",
        email:"g22.om.das@gnkhalsa.edu.in",
        rollno: 436,//477
        iscompleted:"true",
        title: "ABCDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch3",
        year:"2024-2025",//2025-2026
        department:"CS",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"
    },
  ];

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const bulkOps = projects.map(project => ({
      updateOne: {
        filter: { email: project.email },
        update: { $setOnInsert: project }, // Only set if the document does not exist
        upsert: true // Insert if the document doesn't exist
      }
    }));

    const result = await projectModel.bulkWrite(bulkOps);
    console.log(`${result.upsertedCount} new project(s) inserted`);
    console.log(`${result.modifiedCount} existing project(s) updated`);
  } catch (error) {
    console.error("Error connecting to MongoDB or updating data:", error);
  }
};

export default DBconnect;