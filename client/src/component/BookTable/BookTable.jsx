// import React from 'react'
import PropTypes from "prop-types";
const BookTable = ({ books, handleDelete, handleEdit }) => {
  return (
    <div className="container text-center">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book name</th>
            <th scope="col">Releas year</th>
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
                <td>{book.year}</td>
                <td>{book.borrowDay}</td>
                <td>
                  <button className="btn btn-info">
                    {book.status ? "Available" : "Unvailable"}
                  </button>
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
    </div>
  );
};
BookTable.propTypes = {
  books: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
export default BookTable;
