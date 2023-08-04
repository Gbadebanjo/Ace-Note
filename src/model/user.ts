import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);
