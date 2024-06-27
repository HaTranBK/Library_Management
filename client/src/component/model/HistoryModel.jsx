// import React from 'react'
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./historymodel.css";
import moment from "moment";
import { DeleteRentingBook } from "../../utils/utils";
const HistoryModel = ({
  show,
  handleClose,
  bookname,
  rentingbooks,
  fetchRentingBook,
}) => {
  const handleDeleteBorrower = (id) => {
    DeleteRentingBook(id)
      .then(() => {
        fetchRentingBook();
        console.log("delete successfully!");
      })
      .catch((err) => {
        console.log("error from delete renting book: ", err);
      });
  };
  return (
    <div>
      <Modal show={show} dialogClassName="custom-modal-width">
        <Modal.Header>
          <Modal.Title>Borrower Informations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Borrower name</th>
                <th scope="col">MSSV</th>
                <th scope="col">Borrow day</th>
                <th scope="col">Return day</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rentingbooks.map((rentingbook, idx) => {
                if (rentingbook.name === bookname) {
                  return (
                    <tr key={rentingbook._id}>
                      <td>{idx}</td>
                      <td>{rentingbook.borrowername}</td>
                      <td>{rentingbook.mssv}</td>
                      <td>
                        {moment(rentingbook.borrowday).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        {moment(rentingbook.borrowday).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteBorrower(rentingbook._id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

HistoryModel.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bookname: PropTypes.string.isRequired,
  rentingbooks: PropTypes.array.isRequired,
  fetchRentingBook: PropTypes.func.isRequired,
};

export default HistoryModel;
