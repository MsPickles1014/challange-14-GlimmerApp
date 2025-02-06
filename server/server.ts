import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
