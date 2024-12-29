import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authenticate from "./middleware/userAuth.js";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import express from "express";
import cors from "cors";
// const morgan = require("morgan");
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
connectDB();
const app = express();
// In your Express app setup
// const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], // Allowed headers
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-csrf-token');
  next();
});

app.use(express.json());
app.use(cookieParser());
// app.use(morgan("dev"));

//APT Endpoints
app.use("/auth", authRouter);
app.use("/", authenticate, userRouter);
app.get('/admin',authenticate, adminRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//   });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port:${port}`));
