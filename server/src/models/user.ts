import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// import { Event } from "./Events"; 

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date; // Optional, as Sequelize will populate these
  updatedAt?: Date; // Optional
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // public static associate() {
  // User.hasMany(Event, { foreignKey: "userId" });  //Noela Changes 

  // 🔐 Hash password before storing
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  // 🔍 Compare passwords during login
  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at', // Map to snake_case column
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at', // Map to snake_case column
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true, // Enable timestamps
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  return User;
}