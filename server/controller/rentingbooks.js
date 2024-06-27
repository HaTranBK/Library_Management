import { RentingBookModel } from "../model/RentingBookModel.js";

export const getRentingBooks = async (req, res) => {
  try {
    const dataGot = await RentingBookModel.find({});
    if (!dataGot) {
      return res.status(202).json("Book not found !");
    }
    res.status(200).json(dataGot);
  } catch (error) {
    console.log("bạn đang gặp lỗi ở get");
    res.status(500).json({ error });
  }
};
export const getGivenRetingBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookExtrated = await RentingBookModel.findById({ _id: bookId });
    if (!bookExtrated) {
      return res.status(202).json("Book not found !");
    }
    res.status(200).json(bookExtrated);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const createRentingBook = async (req, res) => {
  try {
    const bodyData = req.body;
    const newData = new RentingBookModel(bodyData);
    console.log("new data ", newData);
    const returnedData = await newData.save();
    res.status(202).json(returnedData);
  } catch (error) {
    console.log("lỗi ở post", error.message);
    res.status(500).json({ error });
  }
};
export const deleteRentingBook = async (req, res) => {
  try {
    const UserId = req.params.id;
    const deletedBook = await RentingBookModel.deleteOne({ _id: UserId });
    console.log("deleted book: ", deletedBook);
    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found!" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting book: ", err });
  }
};
