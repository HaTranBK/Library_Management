import mongoose from "mongoose";
const RentingBookSchema = new mongoose.Schema({
  borrowername: { type: String, required: true },
  name: { type: String, required: true },
  mssv: { type: Number, required: true },
  borrowday: { type: Date, required: true },
  mssv: { type: Number, required: true },
});
console.log("banj ddnag vao renting book model !");
export const RentingBookModel = mongoose.model(
  "rentingbooks",
  RentingBookSchema
);
