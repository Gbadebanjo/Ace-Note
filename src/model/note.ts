import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

enum NoteStatus {
    Pending = "Pending",
    Completed = "Completed",
  }
interface NoteAttributes {
    id: string;
    description: string;
    dueDate: Date;
    title: string;
    status: NoteStatus;
    userId: string;
}

export class Note extends Model<NoteAttributes> {}
Note.init({
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    dueDate: {
        type: DataTypes.DATE,
      },
    status: {
        type: DataTypes.ENUM('Pending', 'Completed'),
        allowNull: false,
      },
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
    }
},
{
    sequelize: db,
    tableName: "Notes",
}
);
