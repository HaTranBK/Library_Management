import { Router } from "express";
import {
  getBooks,
  createBook,
  getGivenBook,
  updateBook,
  deleteBook,
} from "../controller/books.js";
import {
  getRentingBooks,
  createRentingBook,
  deleteRentingBook,
} from "../controller/rentingbooks.js";

const router = Router();
//-------------BOOK MODEL---------------------
router.get("/books", getBooks);
router.post("/books/create", createBook);
router.get("/books/:id/:name", getGivenBook);
router.get("/books/:id", getGivenBook);
router.get("/books/:name", getGivenBook);
router.put("/books/update/:id/", updateBook);
router.delete("/books/delete/:id", deleteBook);

//------------RENTING BOOK MODEL----------------
router.get("/rentingbooks/", getRentingBooks);
router.post("/rentingbooks/create", createRentingBook);
router.delete("/rentingbooks/delete/:id", deleteRentingBook);
export default router;
