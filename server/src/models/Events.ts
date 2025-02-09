import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

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
         field: 'eventdate', // Maps to the database column `eventdate`
        allowNull: false,
      },
      eventLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "events",
      timestamps: true,
      sequelize,
    }
  );

  return Event;
}

// ✅ Corrected default export
export default Event;