const path = require("path")
const connectMongo = require('./config/db');
const express = require("express"); 
const cors = require("cors"); 
const morgan = require("morgan"); 
const dotenv = require("dotenv"); 
const authenticate = require("./middleware/authenticate");

dotenv.config({ path: "./config/.env" });

connectMongo();
const app = express();

app.use(cors({
  origin: process.env.FRONT_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Routes
app.use('/auth', require('./routes/auth'));
app.use('/admin', authenticate, require('./routes/admin'));
app.use('/', authenticate, require('./routes/user'));

// Catch-all route: This will serve index.html for all routes not matching API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
