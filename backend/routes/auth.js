const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Email = require("../Model/Email");
var nodemailer = require('nodemailer');
const User = require('../Model/User')

// checkEmail function
router.post("/setpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Email.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id;
    const ltoken = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "5m" });

    const link = `http://localhost:5173/setpassword/${user.email}/${ltoken}`;
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
    console.log(link);

    // In a real-world scenario, you'd send this link via email
    return res.status(200).json({ status: "Reset link sent", link });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
});

router.get("/setpassword/:email/:ltoken", async (req, res) => {
  const { email, ltoken } = req.params;

  try {
    const user = await Email.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id;
    const verify = jwt.verify(ltoken, secret); // Verifying the token

    // If verified, return status so the front-end can proceed with password reset form
    return res.status(200).json({ status: "Token verified", email });
  } catch (error) {
    return res.status(400).json({ status: error.message });
  }
});


router.post('/setpassword/:email/:ltoken',authController.setpassword)


//auth/login
router.post('/login', authController.loginUser)

// Logout Route
router.post('/logout',authController.logoutUser)


module.exports = router
