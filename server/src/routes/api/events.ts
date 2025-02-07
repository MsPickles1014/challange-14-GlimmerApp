// import express, { Request, Response } from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// router.get("/:month/:day", async (req: Request, res: Response) => {
//   const { month, day } = req.params;
//   const language = "en"; // You can allow this to be dynamic later

//   try {
//     const response = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${month}/${day}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching historical events" });
//   }
// });


// export default router;


//added BY OMAR Note 
// * you might want to use something like this

// e.g
// GET /users - Get all users
// router.get('/', async (_req: Request, res: Response) => {
//     try {
//       const users = await User.findAll({
//         attributes: { exclude: ['password'] }
//       });
//       res.json(users);
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   });
