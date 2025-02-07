import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { EventsFactory } from '';

const User = UserFactory(sequelize);
const Events = EventsFactory(sequelize);


// // Define association: A Favorite belongs to a User
// Favorite.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export { User, Events};
