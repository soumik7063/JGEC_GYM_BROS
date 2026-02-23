import express from 'express';
import { clerkAuth, register, manualLogin, getMe } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/login', clerkAuth);
authRouter.post('/register', register);
authRouter.post('/manual-login', manualLogin);
authRouter.get('/me', protect, getMe);

export default authRouter;