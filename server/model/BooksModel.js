import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Date, required: true },
  status: { type: Boolean, required: true },
  borrowDay: { type: Date, required: true },
});

export const bookModel = mongoose.model("books", BookSchema);
