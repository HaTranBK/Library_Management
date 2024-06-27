// import React from 'react'
import moment from "moment";
import PropTypes from "prop-types";
import HistoryModel from "../model/HistoryModel";
import { useState } from "react";

const BorrowedBooks = ({ books, rentingbooks, fetchRentingBook }) => {
  const [show, setShow] = useState(false);
  const [passedname, setPassedName] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleOnDetail = (name_) => {
    setShow(true);
    setPassedName(name_);
  };
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book name</th>
            <th scope="col">Borrowed day</th>
            <th scope="col">History</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => {
            if (!book.status) {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{book.name}</td>
                  <td>{moment(book.borrowDay).format("DD/MM/YYYY")}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleOnDetail(book.name)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <HistoryModel
        bookname={passedname}
        show={show}
        handleClose={handleClose}
        rentingbooks={rentingbooks}
        fetchRentingBook={fetchRentingBook}
      />
    </div>
  );
};

BorrowedBooks.propTypes = {
  books: PropTypes.array.isRequired,
  rentingbooks: PropTypes.array.isRequired,
  fetchRentingBook: PropTypes.func.isRequired,
};

export default BorrowedBooks;
