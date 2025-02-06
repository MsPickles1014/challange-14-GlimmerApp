import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { authenticateToken } from "../middleware/authMiddleware"; // Ensure only logged-in users access this

dotenv.config();
const router = express.Router();

router.get("/:month/:day", authenticateToken, async (req: Request, res: Response) => {
  const { month, day } = req.params;
  const language = "en"; // You can allow this to be dynamic later

  try {
    const response = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${month}/${day}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching historical events" });
  }
});

export default router;
