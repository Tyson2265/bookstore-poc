import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export const getMe = (req: AuthRequest, res: Response) => res.json(req.user);
export const updateMe = async (req: AuthRequest, res: Response) => {
  await req.user!.update(req.body);
  res.json(req.user);
};
