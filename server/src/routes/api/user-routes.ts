import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index';

const router = express.Router();


// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export { router as userRouter };
