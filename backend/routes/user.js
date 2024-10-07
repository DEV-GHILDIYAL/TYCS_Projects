const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

// Apply the authenticateToken middleware to all customer routes
router.get('/', userController.fetchProjects);
router.get('/user', userController.UserProject); // Change the route to fetch user-specific project
router.post('/',  userController.addProject);
router.put('/:id',  userController.updateProject);
router.delete('/:id' , userController.deleteProject);


module.exports = router;