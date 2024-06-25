import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  year: Date,
  status: Boolean,
  borrowDay: Date,
});

export const bookModel = mongoose.model("Books", BookSchema);
