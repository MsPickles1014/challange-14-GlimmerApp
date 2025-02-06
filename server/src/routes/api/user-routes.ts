import express from "express";
import { authenticateToken } from "../../middleware/auth";
import { User, FavoriteEvent } from "../../models/index";

const router = express.Router();

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
      attributes: ["id", "username", "email"],
      include: [{ model: FavoriteEvent, attributes: ["id"] }]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
      favoriteCount: user.FavoriteEvents.length
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update password
router.put("/profile/password", authenticateToken, async (req, res) => {
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email: req.user.email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.setPassword(newPassword);
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
