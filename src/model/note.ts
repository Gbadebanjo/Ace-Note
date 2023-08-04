import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

interface NoteAttributes {
    id: string;
    title: string;
    description: string;
    status: number;
    dueDate: string;
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
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM("Pending","Completed"),
        allowNull: false,
    },
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }
},
{
    sequelize: db,
    tableName: "Notes",
}
);
