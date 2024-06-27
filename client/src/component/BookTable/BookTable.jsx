// import React from 'react'
import PropTypes from "prop-types";
import moment from "moment";
import Model from "../model/Model";
import { useEffect, useState } from "react";
import { GetBookById, UpdateBook } from "../../utils/utils";
const BookTable = ({
  books,
  handleDelete,
  handleEdit,
  handleChange,
  rentingbook,
  setRentingBook,
  setRentingBooks,
  fetchData,
}) => {
  const [nameshow, setNameShow] = useState({
    show: false,
    bookname: "",
    id_: "",
  });
  useEffect(() => {
    setRentingBook((prev) => {
      return { ...prev, name: nameshow.bookname, id: nameshow.id_ };
    });
  }, [nameshow]);
  const handleClose = () => {
    setNameShow((prev) => {
      return { ...prev, show: false, name: "", id_: "" };
    });
  };
  const handleUpdateStatus = (id) => {
    GetBookById(id)
      .then((res) => {
        UpdateBook(res.data._id, { ...res.data, status: false })
          .then((res) => {
            console.log("updating successfully !", res.data);
            fetchData();
          })
          .catch((err) => console.log("loi o update status book: ", err));
      })
      .catch((err) => {
        console.log("lỗi ở lấy given book url có chứa name!: ", err);
      });
  };
  const handleAvailableClick = (book) => {
    setNameShow((prev) => {
      return { ...prev, show: true, bookname: book.name, id_: book._id };
    });
  };
  return (
    <div className="container text-center">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book name</th>
            <th scope="col">Release year</th>
            <th scope="col">Borrowed day</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{book.name}</td>
                <td>{moment(book.year).format("DD/MM/YYYY")}</td>
                <td>{moment(book.borrowDay).format("DD/MM/YYYY")}</td>
                <td>
                  {book.status ? (
                    <button
                      className="btn btn-info"
                      onClick={() => handleAvailableClick(book)}
                    >
                      Available
                    </button>
                  ) : (
                    <button className="btn btn-info" disabled>
                      Unvailable
                    </button>
                  )}
                </td>
                <td>
                  {book.status ? (
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(book._id)}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(book._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Model
        nameshow={nameshow}
        handleClose={handleClose}
        handleChange={handleChange}
        rentingbook={rentingbook}
        setRentingBook={setRentingBook}
        setRentingBooks={setRentingBooks}
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

BookTable.propTypes = {
  books: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setRentingBook: PropTypes.func.isRequired,
  rentingbook: PropTypes.object.isRequired,
  setRentingBooks: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default BookTable;
