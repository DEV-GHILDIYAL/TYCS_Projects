import express from 'express';
import { addstudent } from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.post('/addstudent', addstudent);

export default adminRouter;