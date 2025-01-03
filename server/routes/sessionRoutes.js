import express from 'express';
import { createSession} from '../controllers/sessionController.js';
const sessionRouter = express.Router();
sessionRouter.post('/createsession', createSession);

export default sessionRouter;