import { DataTypes, type Sequelize, Model } from "sequelize";
import { sequelize } from "../config/connection";

// The Events model stores:
// userId: Links the event to a user
// eventText: The event description
// eventDate: The date of the event
// eventLink: A Wikipedia link (if available)

class Event extends Model {
  public id!: number;
  public userId!: number;
  public eventText!: string;
  public eventDate!: string;
  public eventLink?: string;
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "events", // ✅ Use `tableName` instead of `modelName`
    }
  );

  return Event;
}

// ✅ Corrected default export
export default Event;