import express, { Request, Response } from "express";
import { Event } from "../../models/index.js"; // Ensure correct path to models
import { authenticateToken } from "../../middleware/auth.js";
import { Op, Sequelize } from "sequelize"; // Import Sequelize operators

const router = express.Router();

// ✅ GET all events from the database
router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// ✅ GET an event by month and day
router.get("/:month/:day", async (req: Request, res: Response) => {
  try {
    const { month, day } = req.params;

    // Validate month and day
    if (isNaN(Number(month)) || isNaN(Number(day))) {
      return res.status(400).json({ message: "Month and day must be numbers" });
    }

    // Query the database using Sequelize's Op
    const events = await Event.findAll({
      where: Sequelize.and(
        Sequelize.where(Sequelize.fn("EXTRACT", Sequelize.literal("MONTH FROM \"eventdate\"")), Number(month)),
        Sequelize.where(Sequelize.fn("EXTRACT", Sequelize.literal("DAY FROM \"eventdate\"")), Number(day))
      )
    });

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this date" });
    }

    res.json(events);
  } catch (error: any) {
    console.error("Error fetching events by date:", error);
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// ✅ POST new event (Create event)
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId, eventText, eventDate, eventLink } = req.body;
    const newEvent = await Event.create({ userId, eventText, eventDate, eventLink });
    res.status(201).json(newEvent);
  } catch (error: any) {
    console.error("Error creating event:", error);
    res.status(400).json({ message: "Error creating event", error: error.message });
  }
});

// ✅ DELETE event by ID
router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
});

export { router as eventRouter };




















// import express, { Request, Response } from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// // dotenv.config();
// const router = express.Router();

// router.get("/:month/:day", async (req: Request, res: Response) => {
// const { month, day } = req.params;
//   const language = "en"; // You can allow this to be dynamic later

// try {
//     const response = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${month}/${day}`);
//     res.json(response.data);
// } catch (error) {
//     res.status(500).json({ message: "Error fetching historical events" });
// }
// });

// export { router as eventRouter };
