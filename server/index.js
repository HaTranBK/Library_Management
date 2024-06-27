import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routers/post.js";

dotenv.config();

const port = process.env.PORT || 8000;
const URI = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(Cors());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connecting database successfully");
  })
  .catch((err) => {
    console.error("Error from connecting database !", err);
  });

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
