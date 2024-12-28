const students = [
  { rollNumber: 101, name: "John Doe", projectName: "AI Chatbot", category: "Machine Learning", projectLink: "https://github.com/johndoe/ai-chatbot", department: "CS", noOfDayPresent: 8 },
  { rollNumber: 102, name: "Jane Smith", projectName: "E-Commerce Website", category: "Web Development", projectLink: "https://github.com/janesmith/ecommerce-website", department: "IT", noOfDayPresent: 7 },
  { rollNumber: 103, name: "Bob Johnson", projectName: "2D Platformer Game", category: "Game Development", projectLink: "https://github.com/bobjohnson/2d-platformer", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 104, name: "Alice Davis", projectName: "Image Recognition App", category: "Machine Learning", projectLink: "https://github.com/alicedavis/image-recognition", department: "IT", noOfDayPresent: 9 },
  { rollNumber: 105, name: "Chris Lee", projectName: "Portfolio Website", category: "Web Development", projectLink: "https://github.com/chrislee/portfolio", department: "CS", noOfDayPresent: 7 },
  { rollNumber: 106, name: "Emily Clark", projectName: "FPS Shooter Game", category: "Game Development", projectLink: "https://github.com/emilyclark/fps-game", department: "IT", noOfDayPresent: 10 },
  { rollNumber: 107, name: "Michael Brown", projectName: "Stock Price Predictor", category: "Machine Learning", projectLink: "https://github.com/michaelbrown/stock-predictor", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 108, name: "Sarah Wilson", projectName: "Blogging Platform", category: "Web Development", projectLink: "https://github.com/sarahwilson/blogging-platform", department: "IT", noOfDayPresent: 5 },
  { rollNumber: 109, name: "David Garcia", projectName: "Racing Game", category: "Game Development", projectLink: "https://github.com/davidgarcia/racing-game", department: "CS", noOfDayPresent: 8 },
  { rollNumber: 110, name: "Sophia Martinez", projectName: "Face Detection System", category: "Machine Learning", projectLink: "https://github.com/sophiamartinez/face-detection", department: "IT", noOfDayPresent: 9 },
  { rollNumber: 111, name: "James Rodriguez", projectName: "Event Scheduler", category: "Web Development", projectLink: "https://github.com/jamesrodriguez/event-scheduler", department: "CS", noOfDayPresent: 4 },
  { rollNumber: 112, name: "Isabella Hernandez", projectName: "Puzzle Game", category: "Game Development", projectLink: "https://github.com/isabellahernandez/puzzle-game", department: "IT", noOfDayPresent: 7 },
  { rollNumber: 113, name: "Ethan Moore", projectName: "Speech Recognition App", category: "Machine Learning", projectLink: "https://github.com/ethanmoore/speech-recognition", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 114, name: "Olivia Walker", projectName: "Online Store", category: "Web Development", projectLink: "https://github.com/oliviawalker/online-store", department: "IT", noOfDayPresent: 8 },
  { rollNumber: 115, name: "Aiden Perez", projectName: "Adventure Game", category: "Game Development", projectLink: "https://github.com/aidenperez/adventure-game", department: "CS", noOfDayPresent: 10 },
  { rollNumber: 116, name: "Mia Adams", projectName: "Spam Email Classifier", category: "Machine Learning", projectLink: "https://github.com/miaadams/spam-classifier", department: "IT", noOfDayPresent: 7 },
  { rollNumber: 117, name: "Lucas Carter", projectName: "Restaurant Booking System", category: "Web Development", projectLink: "https://github.com/lucascarter/restaurant-booking", department: "CS", noOfDayPresent: 5 },
  { rollNumber: 118, name: "Charlotte Murphy", projectName: "3D Maze Game", category: "Game Development", projectLink: "https://github.com/charlottemurphy/3d-maze", department: "IT", noOfDayPresent: 9 },
  { rollNumber: 119, name: "Daniel Rivera", projectName: "Recommender System", category: "Machine Learning", projectLink: "https://github.com/danielrivera/recommender-system", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 120, name: "Amelia Flores", projectName: "Forum Website", category: "Web Development", projectLink: "https://github.com/ameliaflores/forum-website", department: "IT", noOfDayPresent: 8 },
  { rollNumber: 121, name: "Henry Edwards", projectName: "Physics-Based Puzzle Game", category: "Game Development", projectLink: "https://github.com/henryedwards/physics-puzzle", department: "CS", noOfDayPresent: 7 },
  { rollNumber: 122, name: "Victoria Simmons", projectName: "Image Classifier", category: "Machine Learning", projectLink: "https://github.com/victoriasimmons/image-classifier", department: "IT", noOfDayPresent: 10 },
  { rollNumber: 123, name: "Jack Ramirez", projectName: "Portfolio Website", category: "Web Development", projectLink: "https://github.com/jackramirez/portfolio", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 124, name: "Harper Torres", projectName: "Online Quiz Game", category: "Game Development", projectLink: "https://github.com/harpertorres/quiz-game", department: "IT", noOfDayPresent: 8 },
  { rollNumber: 125, name: "Liam Brooks", projectName: "Chatbot for FAQ", category: "Machine Learning", projectLink: "https://github.com/liambrooks/chatbot-faq", department: "CS", noOfDayPresent: 9 },
  // Additional students
  { rollNumber: 126, name: "Emma Thompson", projectName: "Weather App", category: "Web Development", projectLink: "https://github.com/emmathompson/weather-app", department: "IT", noOfDayPresent: 7 },
  { rollNumber: 127, name: "Noah Anderson", projectName: "Text Summarizer", category: "Machine Learning", projectLink: "https://github.com/noahanderson/text-summarizer", department: "CS", noOfDayPresent: 8 },
  { rollNumber: 128, name: "Ava White", projectName: "RPG Game", category: "Game Development", projectLink: "https://github.com/avawhite/rpg-game", department: "IT", noOfDayPresent: 6 },
  { rollNumber: 129, name: "William Taylor", projectName: "Social Media Dashboard", category: "Web Development", projectLink: "https://github.com/williamtaylor/social-dashboard", department: "CS", noOfDayPresent: 9 },
  { rollNumber: 130, name: "Sofia King", projectName: "Sentiment Analyzer", category: "Machine Learning", projectLink: "https://github.com/sofiaking/sentiment-analyzer", department: "IT", noOfDayPresent: 7 },
  { rollNumber: 131, name: "Benjamin Wright", projectName: "Card Game", category: "Game Development", projectLink: "https://github.com/benjaminwright/card-game", department: "CS", noOfDayPresent: 8 },
  { rollNumber: 132, name: "Luna Scott", projectName: "Task Management App", category: "Web Development", projectLink: "https://github.com/lunascott/task-manager", department: "IT", noOfDayPresent: 10 },
  { rollNumber: 133, name: "Mason Green", projectName: "Object Detector", category: "Machine Learning", projectLink: "https://github.com/masongreen/object-detector", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 134, name: "Chloe Baker", projectName: "Strategy Game", category: "Game Development", projectLink: "https://github.com/chloebaker/strategy-game", department: "IT", noOfDayPresent: 7 },
  { rollNumber: 135, name: "Elijah Nelson", projectName: "Recipe Finder", category: "Web Development", projectLink: "https://github.com/elijahnelson/recipe-finder", department: "CS", noOfDayPresent: 8 },
  { rollNumber: 136, name: "Zoe Carter", projectName: "Music Genre Classifier", category: "Machine Learning", projectLink: "https://github.com/zoecarter/genre-classifier", department: "IT", noOfDayPresent: 9 },
  { rollNumber: 137, name: "Gabriel Hill", projectName: "Tower Defense Game", category: "Game Development", projectLink: "https://github.com/gabrielhill/tower-defense", department: "CS", noOfDayPresent: 5 },
  { rollNumber: 138, name: "Layla Ross", projectName: "Fitness Tracker", category: "Web Development", projectLink: "https://github.com/laylaross/fitness-tracker", department: "IT", noOfDayPresent: 8 },
  { rollNumber: 139, name: "Owen Morgan", projectName: "Language Translator", category: "Machine Learning", projectLink: "https://github.com/owenmorgan/language-translator", department: "CS", noOfDayPresent: 7 },
  { rollNumber: 140, name: "Aria Cooper", projectName: "Educational Game", category: "Game Development", projectLink: "https://github.com/ariacooper/educational-game", department: "IT", noOfDayPresent: 6 },
  { rollNumber: 141, name: "Isaac Peterson", projectName: "Budget Tracker", category: "Web Development", projectLink: "https://github.com/isaacpeterson/budget-tracker", department: "CS", noOfDayPresent: 9 },
  { rollNumber: 142, name: "Scarlett Reed", projectName: "Handwriting Recognition", category: "Machine Learning", projectLink: "https://github.com/scarlettreed/handwriting-recognition", department: "IT", noOfDayPresent: 8 },
  { rollNumber: 143, name: "Leo Bailey", projectName: "Platformer Game", category: "Game Development", projectLink: "https://github.com/leobailey/platformer-game", department: "CS", noOfDayPresent: 7 },
  { rollNumber: 144, name: "Nora Campbell", projectName: "Job Board", category: "Web Development", projectLink: "https://github.com/noracampbell/job-board", department: "IT", noOfDayPresent: 6 },
  { rollNumber: 145, name: "Julian Wood", projectName: "Traffic Predictor", category: "Machine Learning", projectLink: "https://github.com/julianwood/traffic-predictor", department: "CS", noOfDayPresent: 10 },
  { rollNumber: 146, name: "Ruby Price", projectName: "Memory Game", category: "Game Development", projectLink: "https://github.com/rubyprice/memory-game", department: "IT", noOfDayPresent: 8 },
  { rollNumber: 147, name: "Adrian Ross", projectName: "Movie Review Site", category: "Web Development", projectLink: "https://github.com/adrianross/movie-reviews", department: "CS", noOfDayPresent: 7 },
  { rollNumber: 148, name: "Elena Hughes", projectName: "Plant Disease Detector", category: "Machine Learning", projectLink: "https://github.com/elenahughes/plant-disease", department: "IT", noOfDayPresent: 9 },
  { rollNumber: 149, name: "Xavier Foster", projectName: "Space Shooter Game", category: "Game Development", projectLink: "https://github.com/xavierfoster/space-shooter", department: "CS", noOfDayPresent: 6 },
  { rollNumber: 150, name: "Bella Butler", projectName: "Travel Planner", category: "Web Development", projectLink: "https://github.com/bellabutler/travel-planner", department: "IT", noOfDayPresent: 8 }
];

// Add randomness to year, batch, and projectType
students.forEach(student => {
  student.year = Math.random() > 0.5 ? "2024-2025" : "2025-2026";
  student.batch = ["Batch1", "Batch2", "Batch3"][Math.floor(Math.random() * 3)];
  student.projectType = ["Project1", "Project2"][Math.floor(Math.random() * 2)];
});

export default students;