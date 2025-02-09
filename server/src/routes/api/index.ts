import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { eventRouter } from './events-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);

export default router;
