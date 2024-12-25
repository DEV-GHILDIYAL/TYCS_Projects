import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authenticate from "./middleware/userAuth.js";
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js';
import express from "express";
import cors from "cors";
// const morgan = require("morgan"); 
import dotenv from "dotenv";
// const authenticate = require("./middleware/authenticate");

dotenv.config({ path: "./.env" });
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));
// app.use(morgan("dev"));

//APT Endpoints
app.use('/auth', authRouter);
app.use('/',authenticate, userRouter);
// app.get('/auth/admin',authenticate, adminRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//   });

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log(`listening on port:${port}`));