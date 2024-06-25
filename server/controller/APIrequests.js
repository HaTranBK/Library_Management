import { bookModel } from "../model/BooksModel.js";

export const getRequest = async (req, res) => {
  try {
    const dataGot = await bookModel.find({});
    res.status(200).json(dataGot);
  } catch (error) {
    console.log("bạn đang gặp lỗi ở get");
    res.status(500).json({ error });
  }
};
export const getGivenRequest = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookExtrated = await bookModel.findById({ _id: bookId });
    if (!bookExtrated) {
      return res.status(404).json("Book bot found !");
    }
    res.status(200).json(bookExtrated);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const postRequest = async (req, res) => {
  try {
    const bodyData = req.body;
    const newData = new bookModel(bodyData);
    console.log("new data ", newData);
    const returnedData = await newData.save();
    res.status(202).json(returnedData);
  } catch (error) {
    console.log("lỗi ở post", error.message);
    res.status(500).json({ error });
  }
};

export const putRequest = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bodyData = req.body; //lấy dữ liệu ở phía client gửi về.
    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: bodyData },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log("đang gặp lỗi ở putRequest: ", error.message);
    res.status(500).json({ error });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await bookModel.deleteOne({ _id: bookId });
    console.log("deleted book: ", deletedBook);
    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found!" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting book: ", err });
  }
};
