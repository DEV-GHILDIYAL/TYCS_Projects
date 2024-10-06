const express = require("express");
const User = require("../Model/User");
const Email = require("../Model/Email");
const { body, validationResult } = require("express-validator");

const setpassword = async(req,res)=>{
  const { email, ltoken } = req.params;
  const {password} = req.body;
  try{

      const user = await Email.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: "User not exist" });
      }

      const secret = process.env.JWT_SECRET_KEY + user._id; // Your JWT secret
      const verify = jwt.verify(ltoken,secret)
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          email: user.email, 
          password: hashedPassword, 
      });

      await newUser.save(); // Save the new user

    res.json({message:"User has been added"})
    return res.status(200).json({ status: "Email sent", link });
  } catch (error) {
      res.send("not verified");
      return res.status(400).json({ status: error.message });
  }
}

const loginUser = () => {
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
          console.error("Login attempt with unknown email:", email);
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // Use the comparePassword method
        const isMatch = await userExist.comparePassword(password);
        if (isMatch) {
          const token = userExist.generateToken();
          return res.status(200).json({
            message: "Login successful",
            token,
            userId: userExist._id.toString(),
          });
        } else {
          console.warn("Invalid password for user:", email);
          return res.status(401).json({ message: "Invalid email or password" });
        }
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
      }
    };
};

const logoutUser = (req, res) => {
  try {
    localStorage.removeItem("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.json({ message: "Unable to logout" });
  }
};

module.exports = {setpassword, logoutUser, loginUser };
