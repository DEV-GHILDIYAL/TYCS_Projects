import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authenticate from "./middleware/userAuth.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import connectDB from "./config/mongodb.js";
import express from "express";
import cors from "cors";
// const morgan = require("morgan");
import dotenv from "dotenv";
// import admin from "./middleware/adminAuth.js";

dotenv.config({ path: "./.env" });
connectDB();
const app = express();
// In your Express app setup
// const cors = require('cors');
app.use(cors({
  origin: `${process.env.FRONT_URL}`, // Your frontend URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], // Allowed headers
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', `${process.env.FRONT_URL}`);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-csrf-token');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// app.use(morgan("dev"));

//APT Endpoints
app.use("/auth", authRouter);
app.use("/", authenticate, userRouter);
app.use("/admin",authenticate, adminRouter);

app.get("/api/auth/user-role", async (req, res) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.json({ role: "guest" }); // If no token, treat as guest
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    // Send user role as response
    return res.json({ role: user.role }); // Should return "admin" or "user"

  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
});
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//   });



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port:${port}`));