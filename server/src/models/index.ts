import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { FavouriteFactory } from '';

const User = UserFactory(sequelize);
const Favourite = FavouriteFactory(sequelize);


// // Define association: A Favorite belongs to a User
// Favorite.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export { User, Favourite};
