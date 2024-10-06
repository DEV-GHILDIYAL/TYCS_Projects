const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')

//send a request where email is checked and then there will be email send on their email
//auth/register
router.post('/setpassword', authController.setPassword)

//auth/login
router.post('/login', authController.loginUser)

// Logout Route
router.post('/logout',authController.logoutUser)

module.exports = router