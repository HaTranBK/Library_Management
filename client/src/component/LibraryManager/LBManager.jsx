// import React from 'react'

import { useEffect, useState } from "react";
import BookTable from "../BookTable/BookTable";
import BorrowedBooks from "../BorrowedBooks/BorrowedBooks";
import InputForm from "../inputForm/InputForm";
import axios from "axios";

const LBManager = () => {
  let [books, setBooks] = useState([]);
  let [inForBook, setInForBook] = useState({
    name: "",
    author: "",
    year: "",
    status: "",
    borrowDay: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((res) => {
        console.log("res: ", res);
        setBooks(res.data);
      })
      .catch((err) => console.log("lỗi ở useeffect: ", err));
  }, []);
  function fetchData() {
    axios
      .get("http://localhost:8000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.log("lỗi ở lấy data axios get trong hàm xóa: ", err);
      });
  }
  function handleDelete(id) {
    axios
      .delete("http://localhost:8000/books/" + id)
      .then(() => {
        console.log("delete successfully");
        fetchData();
      })
      .catch((err) => {
        console.log("lỗi xóa book", err);
      });
  }
  function handleEdit(id) {
    axios
      .get("http://localhost:8000/books/" + id)
      .then((res) => {
        let gotYear = new Date(res.data.year).toISOString().split("T")[0];
        let gotBorrowDate = new Date(res.data.borrowDay)
          .toISOString()
          .split("T")[0];
        console.log("data got từ handleEdit: ", res.data);
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
      />
      <div className="mx-auto">
        <h2 className="text-center mt-4">BORROWED BOOKS</h2>
      </div>
      <BorrowedBooks books={books} />
    </div>
  );
};

export default LBManager;
