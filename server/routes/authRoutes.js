import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword } from '../controllers/authController.js';
const authRouter = express.Router();
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
authRouter.post('/send-email', sendResetOtp);
authRouter.post('/set-password', resetPassword);

export default authRouter;