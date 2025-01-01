import express from 'express';
import { addstudent,fetchingStudents, getprojectdata, getstudentsdata } from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.post('/addstudent', addstudent);

// adminRouter.post('/attendance', attendance);
adminRouter.get('/user-data')
adminRouter.post('/fetchstudents', fetchingStudents);

adminRouter.get('/getstudent', getstudentsdata);
adminRouter.get('/getproject', getprojectdata);
export default adminRouter;