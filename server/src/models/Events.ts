import { DataTypes, type Sequelize, Model } from "sequelize";
import { Optional } from 'sequelize'; // Add this import****Noela Changes

import { User } from "./user";  // Import the User model*****Noela Changes

// ***added Interface ***Noela Changes
interface EventAttributes {
  id: number;
  userId: number; // Links event to a user
  eventText: string;
  eventDate: Date; //***Noela Changes */
  eventLink?: string;
}

interface EventCreationAttributes extends Optional<EventAttributes, "id"> {} //*** Noela Changes

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public userId!: number;
  public eventText!: string;
  public eventDate!: Date;
  public eventLink?: string;

  // Define the association here****Noela Changes
  public static associate() {
    Event.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
  }
}

// ✅ Corrected function name & return type
export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDate: {
         type: DataTypes.DATEONLY, //Noela changes
        allowNull: false,
      },
      eventLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "events",
      modelName: "Event", //Noela changes
      timestamps: true,
      sequelize,
    }
  );

  return Event;
}

// ✅ Corrected default export
export default Event;