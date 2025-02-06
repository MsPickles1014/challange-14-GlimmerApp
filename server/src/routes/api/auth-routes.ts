import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../../models/index";

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Email already in use" });

      const newUser = await User.create({ username, email, password });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await user.checkPassword(password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
