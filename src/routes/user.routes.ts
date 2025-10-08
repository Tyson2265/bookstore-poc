import { Router } from "express";
import auth from "../middleware/authMiddleware";
import { getMe, updateMe } from "../controllers/user.controller";

const router = Router();
router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);

export default router;
