import express from 'express';
import { addstudent, getprojectdata,createSession, getstudentsdata,fetchSession,deleteSession ,attendanceMark, getAttendanceStatus} from '../controllers/adminController.js';
import admin from '../middleware/adminAuth.js';
const adminRouter = express.Router();

adminRouter.post('/addstudent', addstudent);

// adminRouter.post('/attendance', attendance);
adminRouter.get('/user-data')
adminRouter.post('/createsession', createSession);
adminRouter.post('/attendance/mark', attendanceMark);
adminRouter.post('/attendance/status', getAttendanceStatus);

adminRouter.get('/fetchsession', fetchSession);
adminRouter.delete('/deletesession', deleteSession);


adminRouter.get('/getstudent', getstudentsdata);
adminRouter.get('/getproject', getprojectdata);
export default adminRouter;