// import React from 'react'

import { useEffect, useState } from "react";
import BookTable from "../BookTable/BookTable";
import BorrowedBooks from "../BorrowedBooks/BorrowedBooks";
import InputForm from "../inputForm/InputForm";
import moment from "moment";
import {
  DeleteBook,
  GetBooks,
  GetRentingBook,
  GetBookById,
} from "../../utils/utils";
const LBManager = () => {
  const [books, setBooks] = useState([]);
  const [rentingbooks, setRentingBooks] = useState([]);
  const [inForBook, setInForBook] = useState({
    name: "",
    author: "",
    year: "",
    status: "",
    borrowDay: "",
  });
  const [rentingbook, setRentingBook] = useState({
    borrowername: "",
    name: "",
    mssv: "",
    borrowday: "",
    id: "",
  });

  useEffect(() => {
    GetBooks()
      .then((res) => {
        console.log("res: ", res);
        setBooks(res.data);
      })
      .catch((err) => console.log("lỗi ở useeffect: ", err));
    fetchRentingBook();
  }, []);

  const handleChange = (e) => {
    let { id, value } = e.target;
    setRentingBook((prev) => {
      return { ...prev, [id]: value };
    });
  };

  function fetchData() {
    GetBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.log("lỗi ở lấy data axios get trong hàm xóa: ", err);
      });
  }
  function fetchRentingBook() {
    GetRentingBook()
      .then((res) => setRentingBooks(res.data))
      .catch((err) => {
        console.log("lỗi ở lấy renting books axios get trong hàm xóa: ", err);
      });
  }
  function handleDelete(id) {
    DeleteBook(id)
      .then(() => {
        console.log("delete successfully");
        fetchData();
      })
      .catch((err) => {
        console.log("lỗi xóa book", err);
      });
  }

  function handleEdit(id) {
    GetBookById(id)
      .then((res) => {
        const gotYear = moment(res.data.year).format("YYYY-MM-DD");
        const gotBorrowDate = moment(res.data.borrowDay).format("YYYY-MM-DD");
        setInForBook({
          ...res.data,
          year: gotYear,
          borrowDay: gotBorrowDate,
        });
      })
      .catch((err) => console.log("lỗi trong lấy data trong edit: ", err));
  }

  return (
    <div>
      <h2 className="m-4">Library Mangagement</h2>
      <InputForm
        setBooks={setBooks}
        inForBook={inForBook}
        setInForBook={setInForBook}
      />
      <div className="mx-auto">
        <h2 className="text-center mt-4">LIST BOOKS</h2>
      </div>
      <BookTable
        books={books}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleChange={handleChange}
        rentingbook={rentingbook}
        setRentingBook={setRentingBook}
        setRentingBooks={setRentingBooks}
        fetchData={fetchData}
      />
      <div className="mx-auto">
        <h2 className="text-center mt-4">BORROWED BOOKS</h2>
      </div>
      <BorrowedBooks
        rentingbooks={rentingbooks}
        books={books}
        fetchRentingBook={fetchRentingBook}
      />
    </div>
  );
};

export default LBManager;
