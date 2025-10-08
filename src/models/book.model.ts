import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";

class Book extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public coverImage!: string;
  public authorId!: number;
  public isPublished!: boolean;
}

Book.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    coverImage: DataTypes.STRING,
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, modelName: "book" }
);

User.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(User, { foreignKey: "authorId" });

export default Book;
