import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword, getProfile, userRole, editProfile,storeProfilePicture } from '../controllers/authController.js';

import multer from "multer";
const authRouter = express.Router();
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
authRouter.post('/send-email', sendResetOtp);
authRouter.post('/set-password', resetPassword);
authRouter.get('/get-profile', getProfile);
authRouter.post('/update-profile', editProfile);
authRouter.get('/user-role', userRole);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// const upload = multer({dest: "uploads/"});
const upload = multer({storage})
authRouter.post('/upload', upload.single('profilePicture'), storeProfilePicture);

export default authRouter;