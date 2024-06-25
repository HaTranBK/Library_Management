import { Router } from "express";
import {
  deleteRequest,
  getGivenRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../controller/APIrequests.js";

const router = Router();

router.get("/books", getRequest);
router.post("/books", postRequest);
router.get("/books/:id", getGivenRequest);
router.put("/books/update/:id", putRequest);
router.delete("/books/:id", deleteRequest);

export default router;
