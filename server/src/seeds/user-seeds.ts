import { User } from '../models/user.js';

export const seedUsers = async () => {
  try {

    await User.bulkCreate(
      [
        { username: 'JollyGuru', email: 'jolly@guru.com', password: "password" },
        { username: 'SunnyScribe', email: 'sunny@scribe.com', password: "password" },
        { username: 'RadiantComet', email: 'radiant@comet.com', password: "password" },
      ],
      { individualHooks: true } // ✅ Ensures Sequelize hooks apply correctly
    );

    console.log('✅ Users successfully seeded!');
  } catch (error) {
    console.error('🚨 Error seeding users:', error);
  }
};