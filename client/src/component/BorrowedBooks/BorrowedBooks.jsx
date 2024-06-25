// import React from 'react'
import PropTypes from "prop-types";
const BorrowedBooks = ({ books }) => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">_ID</th>
            <th scope="col">Borrowed day</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => {
            if (!book.status) {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{book._id}</td>
                  <td>{book.borrowDay}</td>
                  <td className="text-danger">
                    {book.status ? "Đã trả" : "Chưa trả"}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};
BorrowedBooks.propTypes = {
  books: PropTypes.array.isRequired,
};
export default BorrowedBooks;
