import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <div className="about-section">
        <h2>What This Website Is About</h2>
        <p className="about-section-p">
          This website was created to showcase the final-year projects of <strong>TYCS</strong> students from <strong>Guru Nanak Khalsa College</strong>, Computer Science Department. It provides a platform where students can share their projects with their peers. Students can deploy their projects externally using platforms like <strong>Netlify</strong>, <strong>Heroku</strong>, or even Appetize.io for mobile apps, which allows you to run your app in a browser as an emulator. After deployment, students can submit the project link through our website. Once submitted, the project card will be displayed on the home screen, allowing others in the class to easily view and access the projects online.
        </p>
      </div>

      <div className="about-section">
        <h2>Inspiration</h2>
        <p className="about-section-p">
          This project was inspired by the need for a more organized way to present and access final-year projects during the project sessions. Instead of individually presenting projects through local setups like <strong>VS Code</strong>, students can now simply submit a deployed link to this website. This not only makes it easier for students to showcase their work but also provides teachers with a centralized platform to search for and view student projects by name, along with detailed descriptions and ideas. It streamlines the entire process, making project reviews more efficient and accessible for everyone.
        </p>
      </div>

      <div className="about-section">
        <h2>Technology Stack</h2>
        <p className="about-section-p">
          This project is built using the <strong>MERN stack</strong>, which includes <strong>MongoDB</strong> for the database, <strong>Express.js</strong> for the backend, <strong>React.js</strong> for the frontend, and <strong>Node.js</strong> for server-side operations. Together, these technologies provide a full-stack solution that allows for efficient, scalable, and dynamic web development. The entire project is powered by the MERN stack, making it a complete and robust solution for organizing and displaying student projects.
        </p>
      </div>

      <div className="about-section">
        <h2>Meet the Developers</h2>
        <p className="about-section-p">
          This website was developed by <strong>Dev (Roll No. 421)</strong> and <strong>Shivansh (Roll No. 477)</strong>, students from the TYCS class at <strong>Guru Nanak Khalsa College</strong>. We built this platform in just <strong>28 hours</strong>, so it's still a work in progress. If you encounter any bugs or have suggestions for improvement, please feel free to <a href="https://forms.gle/MewwVorSko7ctt3C8" target="_blank" rel="noopener noreferrer">fill out this form</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
