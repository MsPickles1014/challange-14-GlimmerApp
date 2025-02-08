import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  try {
    // 🔹 Hash passwords before inserting users
    const hashedPassword = await bcrypt.hash('password', 10);

    await User.bulkCreate(
      [
        { username: 'JollyGuru', email: 'jolly@guru.com', password: hashedPassword },
        { username: 'SunnyScribe', email: 'sunny@scribe.com', password: hashedPassword },
        { username: 'RadiantComet', email: 'radiant@comet.com', password: hashedPassword },
      ],
      { individualHooks: true } // ✅ Ensures Sequelize hooks apply correctly
    );

    console.log('✅ Users successfully seeded!');
  } catch (error) {
    console.error('🚨 Error seeding users:', error);
  }
};