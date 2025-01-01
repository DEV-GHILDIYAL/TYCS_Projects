import express from 'express';
import { addstudent,attendance } from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.post('/addstudent', addstudent);

adminRouter.post('/attendance', attendance);
adminRouter.get('/user-data')

export default adminRouter;