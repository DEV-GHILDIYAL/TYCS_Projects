const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

// Apply the authenticateToken middleware to all customer routes
router.get('/', userController.fetchProjects);
router.post('/',  userController.addProject);
router.put('/:id',  userController.updateProject);
router.delete('/:id' , userController.deleteProject);
router.get('/' , userController.UserProject);

module.exports = router;