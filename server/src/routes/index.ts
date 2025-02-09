import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { userRouter } from './api/user-routes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes); // 👈 This must be here!
router.use('/api/users', userRouter); // Ensure '/users' is accessible without token
router.use('/api', authenticateToken, apiRoutes);

export default router;
