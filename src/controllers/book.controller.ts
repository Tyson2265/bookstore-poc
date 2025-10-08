import { Request, Response } from "express";
import Book from "../models/book.model";
import { AuthRequest } from "../middleware/authMiddleware";
import { Builder } from "xml2js";

const builder = new Builder();

export const listBooks = async (req: Request, res: Response) => {
  const q = req.query.q as string | undefined;
  const where = { isPublished: true, ...(q ? { title: { $like: `%${q}%` } } : {}) };
  const books = await Book.findAll({ where });

  if (req.headers["content-type"] === "application/xml") {
    res.set("Content-Type", "application/xml");
    return res.send(builder.buildObject({ books }));
  }
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findByPk(req.params.id);
  if (!book || !book.isPublished) return res.status(404).json({ message: "Not found" });
  res.json(book);
};

export const createBook = async (req: AuthRequest, res: Response) => {
  const { title, description, price, coverImage } = req.body;
  const book = await Book.create({
    title,
    description,
    price,
    coverImage,
    authorId: req.user!.id,
  });
  res.json(book);
};

export const unpublishBook = async (req: AuthRequest, res: Response) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  
  book.isPublished = false;
  await book.save();
  res.json(book);
};

export const updateBook = async (req: AuthRequest, res: Response) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  

  const { title, description, price, coverImage, isPublished } = req.body;
  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (price !== undefined) book.price = price;
  if (coverImage !== undefined) book.coverImage = coverImage;
  if (isPublished !== undefined) book.isPublished = isPublished;

  await book.save();
  res.json(book);
};
