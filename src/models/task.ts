import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Task extends Model {
  public id!: number;
  public title!: string;
  public points!: number;
  public priority!: string;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priority: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Task;
