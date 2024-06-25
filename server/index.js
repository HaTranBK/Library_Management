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
  .connect(URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error from connecting database !", err);
  });
app.use(router);
app.get("/", (req, res) => {
  console.log("done /");
});
