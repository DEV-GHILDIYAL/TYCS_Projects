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
    {
      userId: "6777a009c916ba93f8fd72cc",
      name: "shiwans vaishya",
      email:"g22.shiwans.vaishya@gnkhalsa.edu.in",
      iscompleted:"true",
      rollno: 477,//477
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
      userId: "6777d0acc916ba93f8fd72d0",
      name: "kabir patel",
      email:"g22.kabir.patel@gnkhalsa.edu.in",
      iscompleted:"true",
      rollno: 409,//477
      title: "ABCDEF",
      description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
      category: "Web Development",
      deployed: "http://localhost:5173/",
      batch:"Batch1",
      year:"2024-2025",//2025-2026
      department:"CS",//IT
      project: "Project Two",//Project One
      github: "http://localhost:5173/"
  },
  {
      userId: "6777d0acc916ba93f8fd72d1",
      name: "rohan reddy",
      email:"g22.rohan.reddy@gnkhalsa.edu.in",
      rollno: 490,//477
      iscompleted:"true",
      title: "ABCDEF",
      description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
      category: "Web Development",
      deployed: "http://localhost:5173/",
      batch:"Batch3",
      year:"2025-2026",//2025-2026
      department:"IT",//IT
      project: "Project Two",//Project One
      github: "http://localhost:5173/"
  },
  {
      userId: "6777d0acc916ba93f8fd72d2",
      name: "aarav gupta",
      email:"g22.aarav.gupta@gnkhalsa.edu.in",
      rollno: 408,//477
      iscompleted:"true",
      title: "ABCDEF",
      description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
      category: "Web Development",
      deployed: "http://localhost:5173/",
      batch:"Batch1",
      year:"2025-2026",//2025-2026
      department:"IT",//IT
      project: "Project Two",//Project One
      github: "http://localhost:5173/"
  },
  {
      userId: "6777d0acc916ba93f8fd72d3",
      name: "atharv reddy",
      email:"g22.atharv.reddy@gnkhalsa.edu.in",
      rollno: 441,//477
      iscompleted:"true",
      title: "ABCDEF",
      description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
      category: "Web Development",
      deployed: "http://localhost:5173/",
      batch:"Batch3",
      year:"2025-2026",//2025-2026
      department:"CS",//IT
      project: "Project Two",//Project One
      github: "http://localhost:5173/"
  },
  {
      userId: "6777d0acc916ba93f8fd72d4",
      name: "om reddy",
      email:"g22.om.reddy@gnkhalsa.edu.in",
      rollno: 471,//477
      iscompleted:"true",
      title: "ABCDEF",
      description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
      category: "Web Development",
      deployed: "http://localhost:5173/",
      batch:"Batch3",
      year:"2025-2026",//2025-2026
      department:"CS",//IT
      project: "Project Two",//Project One
      github: "http://localhost:5173/"
  },
  {
    userId: "6777d0acc916ba93f8fd72cf",
    name: "om verma",
    email:"g22.omm.verma@gnkhalsa.edu.in",
    iscompleted:"true",
    rollno: 500,//477
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
    email:"g22.adityaa.mishra@gnkhalsa.edu.in",
    iscompleted:"true",
    rollno: 501,//477
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
    email:"g22.aaravv.khan@gnkhalsa.edu.in",
    rollno: 502,//477
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
{name: "aarav singh",
    email:"g22.aaravv.singhas@gnkhalsa.edu.in",
    rollno: 510,//477
    iscompleted:"true",
    title: "ABCfdaDEF",
    description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
    category: "Web Development",
    deployed: "http://localhost:5173/",
    batch:"Batch3",
    year:"2024-2025",//2025-2026
    department:"CS",//IT
    project: "Project Two",//Project One
    github: "http://localhost:5173/"},
    {name: "aarav singh",
        email:"g22.aaravdsfv.singhas@gnkhalsa.edu.in",
        rollno: 511,//477
        iscompleted:"true",
        title: "ABCfdaDEF",
        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
        category: "Web Development",
        deployed: "http://localhost:5173/",
        batch:"Batch3",
        year:"2024-2025",//2025-2026
        department:"CS",//IT
        project: "Project Two",//Project One
        github: "http://localhost:5173/"},
        {name: "aarav singh",
            email:"g22.aaravxcdsfv.singhas@gnkhalsa.edu.in",
            rollno: 512,//477
            iscompleted:"true",
            title: "ABCfdaDEF",
            description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
            category: "Web Development",
            deployed: "http://localhost:5173/",
            batch:"Batch2",
            year:"2024-2025",//2025-2026
            department:"CS",//IT
            project: "Project Two",//Project One
            github: "http://localhost:5173/"},
            {name: "aarav singh",
                email:"g22.aaravdfdsfsfv.singhas@gnkhalsa.edu.in",
                rollno: 513,//477
                iscompleted:"true",
                title: "ABCfdaDEF",
                description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
                category: "Web Development",
                deployed: "http://localhost:5173/",
                batch:"Batch2",
                year:"2024-2025",//2025-2026
                department:"CS",//IT
                project: "Project Two",//Project One
                github: "http://localhost:5173/"},
                {name: "aarav singh",
                    email:"g22.aaravdsfv.sidfsnghas@gnkhalsa.edu.in",
                    rollno: 514,//477
                    iscompleted:"true",
                    title: "ABCfdaDEF",
                    description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
                    category: "Web Development",
                    deployed: "http://localhost:5173/",
                    batch:"Batch1",
                    year:"2024-2025",//2025-2026
                    department:"CS",//IT
                    project: "Project Two",//Project One
                    github: "http://localhost:5173/"},
                    {name: "aarav singh",
                        email:"g22.aaravdsfv.sifsnghas@gnkhalsa.edu.in",
                        rollno: 515,//477
                        iscompleted:"true",
                        title: "ABCfdaDEF",
                        description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
                        category: "Web Development",
                        deployed: "http://localhost:5173/",
                        batch:"Batch1",
                        year:"2024-2025",//2025-2026
                        department:"CS",//IT
                        project: "Project Two",//Project One
                        github: "http://localhost:5173/"},
                        {name: "aarav singh",
                            email:"g22.daf.fsad@gnkhalsa.edu.in",
                            rollno: 517,//477
                            iscompleted:"true",
                            title: "ABCfdaDEF",
                            description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
                            category: "Web Development",
                            deployed: "http://localhost:5173/",
                            batch:"Batch1",
                            year:"2024-2025",//2025-2026
                            department:"CS",//IT
                            project: "Project One",//Project One
                            github: "http://localhost:5173/"},
                            {name: "aarav singh",
                                email:"g22.daf.fsdfad@gnkhalsa.edu.in",
                                rollno: 518,//477
                                iscompleted:"true",
                                title: "ABCfdaDEF",
                                description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
                                category: "Web Development",
                                deployed: "http://localhost:5173/",
                                batch:"Batch1",
                                year:"2024-2025",//2025-2026
                                department:"CS",//IT
                                project: "Project One",//Project One
                                github: "http://localhost:5173/"},
                                {name: "aarav singh",
                                    email:"g22.daf.fsfdad@gnkhalsa.edu.in",
                                    rollno: 517,//477
                                    iscompleted:"true",
                                    title: "ABCfdaDEF",
                                    description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
                                    category: "Web Development",
                                    deployed: "http://localhost:5173/",
                                    batch:"Batch2",
                                    year:"2024-2025",//2025-2026
                                    department:"CS",//IT
                                    project: "Project One",//Project One
                                    github: "http://localhost:5173/"},
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