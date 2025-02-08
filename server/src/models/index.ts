import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { EventFactory } from './Events.js';

const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);

// public static associate() {
//     Event.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
//   }


// // Define association: A Favorite belongs to a User
// Favorite.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export { User, Event};
