import express, { Request, Response } from "express";
import Favorite from "../../models/Favorite";

const router = express.Router();

// Save a favorite event
router.post("/", async (req: Request, res: Response) => {
  const { eventText, eventDate, eventLink } = req.body;
  const userId = req.user?.id; // Get user ID from token

  if (!eventText || !eventDate) {
    return res.status(400).json({ message: "Event text and date are required" });
  }

  try {
    const favorite = await Favorite.create({ userId, eventText, eventDate, eventLink });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Error saving favorite event" });
  }
});

// Get all favorite events for a user
router.get("/", async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite events" });
  }
});

// Delete a favorite event
router.delete("/:id", async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const favoriteId = req.params.id;

  try {
    const favorite = await Favorite.findOne({ where: { id: favoriteId, userId } });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite event not found" });
    }
    await favorite.destroy();
    res.json({ message: "Favorite event removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting favorite event" });
  }
});

export default router;



// POST /favorites/ → Save a favorite event
// GET /favorites/ → Retrieve all favorite events for a user
// DELETE /favorites/:id → Remove a favorite event