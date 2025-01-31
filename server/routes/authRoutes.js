import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword, getProfile, userRole } from '../controllers/authController.js';
const authRouter = express.Router();
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
authRouter.post('/send-email', sendResetOtp);
authRouter.post('/set-password', resetPassword);
authRouter.get('/get-profile', getProfile);

authRouter.get('/user-role', userRole);

export default authRouter;