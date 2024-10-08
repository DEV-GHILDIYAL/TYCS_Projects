const path = require("path");
const connectMongo = require('./config/db');
const express = require("express"); 
const cors = require("cors"); 
const morgan = require("morgan"); 
const dotenv = require("dotenv"); 
const authenticate = require("./middleware/authenticate");

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Connect to MongoDB
connectMongo();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONT_URL, // Ensure FRONT_URL is set correctly in your .env file
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend'))); // Make sure this path is correct

// Admin routes
app.use('/auth', require('./routes/auth'));
app.use('/admin', authenticate, require('./routes/admin'));

// Normal user routes
app.use('/', authenticate, require('./routes/user'));

// Catch-all route to serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html')); // Ensure this points to index.html in frontend
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
