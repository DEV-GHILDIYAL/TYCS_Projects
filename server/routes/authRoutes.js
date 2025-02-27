import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword, getProfile, userRole, editProfile,storeProfilePicture } from '../controllers/authController.js';

import multer from "multer";
import cloudinary from '../config/cloudinaryConfig.js';
import { CloudinaryStorage } from "multer-storage-cloudinary";
const authRouter = express.Router();
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
authRouter.post('/send-email', sendResetOtp);
authRouter.post('/set-password', resetPassword);
authRouter.get('/get-profile', getProfile);
authRouter.post('/update-profile', editProfile);
authRouter.get('/user-role', userRole);
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "user_profile_pictures", // Folder name in Cloudinary
      format: async (req, file) => "png", // Convert images to PNG
      public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique filename
    },
  });
// const upload = multer({dest: "uploads/"});
const upload = multer({storage})
// authRouter.post('/upload', upload.single('profilePicture'), storeProfilePicture);
authRouter.post(
  '/upload',
  (req, res, next) => {
    console.log("Route /upload is being called");
    next(); // Make sure next() is called
  },
  upload.single("profilePicture"), // Multer middleware
  (req, res, next) => {
    console.log("File upload middleware executed");
    if (!req.file) {
      console.error("No file in req.file");
      return res.status(400).send("No file uploaded.");
    }
    console.log("Uploaded File:", req.file);
    next(); // Continue to next middleware if file is uploaded
  },
  storeProfilePicture // Your function to handle the uploaded file
);


export default authRouter;