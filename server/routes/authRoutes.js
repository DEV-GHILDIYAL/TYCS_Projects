import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

//   /auth/register ......
// authRouter.post('/register', register);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
// authRouter.post('/setpassword',setpassword);
//verifypass
// authRouter.post('/setpassword/:email/:ltoken', verifytoken);
// setnewpass
// authRouter.post('/setpassword/:email/:ltoken', setnewpass);

// authRouter.post('/send-verify-otp', userAuth,  sendVerifyOtp);
// authRouter.post('/verify-account', userAuth, verifyEmail);
// authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;