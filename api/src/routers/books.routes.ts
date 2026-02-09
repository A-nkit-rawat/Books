import {Router} from "express";
import { createBookController, deleteBooks, getBookController, getBooksController, getSuggestion, updateBooks } from "../controllers/books.controller";
export const booksRouters=Router();
booksRouters.get("/",getBooksController)
booksRouters.get("/:id",getBookController)
booksRouters.post("/",createBookController);
booksRouters.put("/:id",updateBooks)
booksRouters.delete("/:id",deleteBooks)
booksRouters.get("/suggest/book",getSuggestion)
