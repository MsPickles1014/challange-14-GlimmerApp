import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/connection";
import authRoutes from "./routes/api/auth-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/auth", authRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
