// import React from 'react'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { CreateRentingBook, GetRentingBook } from "../../utils/utils";
const Model = ({
  nameshow,
  handleClose,
  handleChange,
  rentingbook,
  setRentingBooks,
  handleUpdateStatus,
}) => {
  const fetchRentingBooks = () => {
    GetRentingBook()
      .then((res) => setRentingBooks(res.data))
      .catch((err) => console.log("loi ow fetch renting book: ", err));
  };
  const handleOnSave = () => {
    CreateRentingBook(rentingbook)
      .then((res) => {
        console.log("res data: ", res.data);
        handleUpdateStatus(rentingbook.id);
        fetchRentingBooks();
        handleClose();
      })
      .catch((err) => {
        console.log("lỗi ở tạo renting book: ", err);
      });
  };
  return (
    <div>
      <Modal show={nameshow.show}>
        <Modal.Header>
          <Modal.Title>Borrower Informations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="formSubmit">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="borrowername">
                  <Form.Label className="fw-bold">Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="VD: Nguyễn Văn A"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="mssv">
                  <Form.Label className="fw-bold">MSSV: </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="VD: 2210850"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="borrowday">
                  <Form.Label className="fw-bold">Borrow Day: </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="VD: 2021"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Model.propTypes = {
  nameshow: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setRentingBooks: PropTypes.func.isRequired,
  rentingbook: PropTypes.object.isRequired,
  handleUpdateStatus: PropTypes.func.isRequired,
};
export default Model;
