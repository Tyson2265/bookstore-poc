import { Router } from "express";
import auth from "../middleware/authMiddleware";
import { listBooks, getBook, createBook, unpublishBook, updateBook } from "../controllers/book.controller";

const router = Router();
router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, unpublishBook);

export default router;
