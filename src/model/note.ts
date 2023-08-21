import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { v4 as uuidv4 } from "uuid";

interface NoteAttributes {
    id: string;
    description: string;
    dueDate: string;
    title: string;
    status: string;
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
