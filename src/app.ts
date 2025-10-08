import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

sequelize.sync({ alter: true });
export default app;
