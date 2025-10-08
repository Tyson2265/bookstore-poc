import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, pseudonym } = req.body;
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed, pseudonym });
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  res.json({ access_token: token });
};
