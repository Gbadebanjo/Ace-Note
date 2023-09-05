import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { Note } from "./note";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  googleId: string;
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
        allowNull: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    googleId: { 
        type: DataTypes.STRING,
        allowNull: true,
    }
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);

User.hasMany(Note, {foreignKey:'userId', as:'Notes'});
Note.belongsTo(User, {foreignKey:'userId', as:'Users'})