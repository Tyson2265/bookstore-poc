import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public pseudonym!: string;
  public password!: string;
}

User.init(
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    pseudonym: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "user" }
);

export default User;
