import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection";


//The Favorite model stores:
// userId: Links the favorite event to a user
// eventText: The event description
// eventDate: The date of the event
// eventLink: A Wikipedia link (if available)



class Events extends Model {
  public id!: number;
  public userId!: number;
  public eventText!: string;
  public eventDate!: string;
  public eventLink?: string;
}

Events.init(
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
    modelName: "events",
  }
);


export default Events;