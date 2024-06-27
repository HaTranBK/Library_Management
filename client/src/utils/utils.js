import axios from "axios";

const BASE_PATH_PREFIX = "http://localhost:8000/books/";
const BASERENTING_PATH_PREFIX = "http://localhost:8000/rentingbooks/";
export const GetBookById = (id) => {
  return axios.get(`${BASE_PATH_PREFIX}${id}`);
};
export const DeleteBook = (id) => {
  return axios.delete(`${BASE_PATH_PREFIX}delete/${id}`);
};
export const GetBooks = () => {
  return axios.get(`${BASE_PATH_PREFIX}`);
};
export const UpdateBook = (id, updatedData) => {
  return axios.put(`${BASE_PATH_PREFIX}update/${id}`, updatedData);
};
export const CreateBook = (createdBook) => {
  return axios.post(`${BASE_PATH_PREFIX}create/`, createdBook);
};

//------------------//----------------------//
export const GetRentingBook = () => {
  return axios.get(`${BASERENTING_PATH_PREFIX}`);
};
export const CreateRentingBook = (createdBook) => {
  return axios.post(`${BASERENTING_PATH_PREFIX}create`, createdBook);
};

export const DeleteRentingBook = (id) => {
  return axios.delete(`${BASERENTING_PATH_PREFIX}delete/${id}`);
};
