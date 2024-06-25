// import React from 'react'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import "./inputForm.css";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
const InputForm = React.memo(({ setBooks, inForBook, setInForBook }) => {
  console.log("rerender component inputform 19");
  const handleChange = (e) => {
    let { id, value } = e.target;
    setInForBook({ ...inForBook, [id]: value });
  };
  //   function fetchData() {
  //     axios
  //       .get("http://localhost:8000/books")
  //       .then((res) => setBooks(res.data))
  //       .catch((err) => console.log("err from get in handleSubmit: ", err));
  //   }
  function fetchDataInput() {
    setInForBook({
      name: "",
      author: "",
      year: "",
      status: "",
      borrowDay: "",
    });
    axios
      .get("http://localhost:8000/books")
      .then((res) => {
        setBooks(res.data);
        console.log("bạn đang axios get trong handlesubmit");
      })
      .catch((err) => console.log("err from get in handleSubmit: ", err));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inForBook._id) {
      console.log("bạn đang vào if của submit ", inForBook._id);
      axios
        .put("http://localhost:8000/books/update/" + inForBook._id, inForBook)
        .then((res) => {
          console.log("bạn cập nhật thành công trong update: ", res.data);
          fetchDataInput();
        })
        .catch((err) =>
          console.log("bạn đang gặp lỗi ở submit có cập nhật", err)
        );
    } else {
      console.log("bạn đang vào else của submit");
      axios
        .post("http://localhost:8000/books", inForBook)
        .then((res) => {
          console.log("post successfully: ", res.data);
          fetchDataInput();
        })
        .catch((err) => {
          console.log("error from handlesubmit axios: ", err);
        });
    }
  };

  return (
    <Container className="inputForm mt-5 p-4">
      <Form onSubmit={handleSubmit} id="formSubmit">
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="fw-bold">Name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="VD: Nguyễn Văn A"
                onChange={handleChange}
                value={inForBook.name}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="author">
              <Form.Label className="fw-bold">Author: </Form.Label>
              <Form.Control
                type="text"
                placeholder="VD: Nguyễn Văn A"
                onChange={handleChange}
                value={inForBook.author}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="year">
              <Form.Label className="fw-bold">Release Year: </Form.Label>
              <Form.Control
                type="date"
                placeholder="VD: 2021"
                onChange={handleChange}
                value={inForBook.year}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label className="fw-bold">Status:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e)}
                value={inForBook.status}
              >
                <option>Select status</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="borrowDay">
              <Form.Label className="fw-bold">Borrowed Day: </Form.Label>
              <Form.Control
                type="date"
                placeholder="VD: 2021-01-01"
                onChange={handleChange}
                value={inForBook.borrowDay}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="success" className="mb-3 px-5 fw-bold" type="submit">
            Add
          </Button>
        </div>
      </Form>
    </Container>
  );
});

InputForm.propTypes = {
  setBooks: PropTypes.func.isRequired,
  inForBook: PropTypes.object.isRequired,
  setInForBook: PropTypes.func.isRequired,
};
InputForm.displayName = "InputForm"; // Adding display name here
export default InputForm;
