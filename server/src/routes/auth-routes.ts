import { Router, type Request, type Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    console.log("🔹 Login request received:", req.body);

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Authentication failed" });
    }

    console.log("✅ User found:", user.username);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ message: "Authentication failed" });
    }

    const secretKey = process.env.JWT_SECRET_KEY || "default_secret";
    const token = jwt.sign({ username }, secretKey);
    //{ expiresIn: "1h" }

    console.log("✅ Token generated:", token);
    return res.json({ token });
  } catch (error) {
    console.error("🚨 Error in login route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const router = Router();
router.post("/login", login); 

// POST /users - Create a new user
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;