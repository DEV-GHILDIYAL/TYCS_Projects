const express = require("express");
const User = require("../Model/User");


const loginUser = async (req,res) => {

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
            // userId: userExist._id.toString(),
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


module.exports = { loginUser };
