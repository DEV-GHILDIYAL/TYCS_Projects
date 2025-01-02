import express from 'express';
import { addstudent,fetchingStudents, getprojectdata, getstudentsdata,createSession,fetchSession,deleteSession } from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.post('/addstudent', addstudent);

// adminRouter.post('/attendance', attendance);
adminRouter.get('/user-data')
adminRouter.post('/createsession', createSession);
adminRouter.post('/fetchstudents', fetchingStudents);
adminRouter.get('/fetchsession', fetchSession);
adminRouter.delete('/deletesession', deleteSession);


adminRouter.get('/getstudent', getstudentsdata);
adminRouter.get('/getproject', getprojectdata);
export default adminRouter;