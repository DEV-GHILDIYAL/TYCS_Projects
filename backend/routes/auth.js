const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')

//auth/register
router.post('/register', authController.registerUser)

//auth/login
router.post('/login', authController.loginUser)

// Logout Route
router.post('/logout',authController.logoutUser)

module.exports = router