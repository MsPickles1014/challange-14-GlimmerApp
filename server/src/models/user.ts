import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
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
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("password")) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  return User;
}
