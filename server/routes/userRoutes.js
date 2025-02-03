import express from 'express';
import { getUserData,fetchProjects, addProject, updateProject, deleteProject,UserProject} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/data', getUserData);
userRouter.get('/', fetchProjects);
userRouter.get('/user', UserProject);
userRouter.post('/',addProject );
userRouter.put('/:id', updateProject);
userRouter.delete('/:id', deleteProject);


export default userRouter;