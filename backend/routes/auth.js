const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Email = require("../Model/Email");
var nodemailer = require('nodemailer');

// checkEmail function
router.post("/setpassword",async(req,res)=>{
    const { email } = req.body;
    try {
      const user = await Email.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: "User not exist" });
      }
  
      const secret = process.env.JWT_SECRET_KEY + user._id; // Your JWT secret
      const ltoken = jwt.sign({ email: user.email, id: user._id }, secret, {expiresIn: "5m"});

      const link = `http://localhost:5173/setpassword/${user.email}/${ltoken}`;
      console.log(link);
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'g22.shiwans.vaishya@gnkhalsa.edu.in',
          pass: process.env.PASS
        }
      });
      
      var mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Set you password for logging in',
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      // Here you would typically send the email containing the link
      return res.status(200).json({ status: "Email sent", link });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "Internal server error" });
    }
})

router.get("/setpassword/:email/:ltoken",async(req,res)=>{
    const { email, ltoken } = req.params;

        const user = await Email.findOne({ email });
        if (!user) {
          return res.status(400).json({ status: "User not exist" });
        }

        const secret = process.env.JWT_SECRET_KEY + user._id; // Your JWT secret
    try{
        const verify = jwt.verify(ltoken,secret)
        //call here 
      return res.status(200).json({ status: "Email sent", link });
    } catch (error) {
        res.send("not veriefed");
        return res.status(400).json({ status: error.message });
    }

})

//auth/login
router.post('/login', authController.loginUser)

// Logout Route
router.post('/logout',authController.logoutUser)


module.exports = router