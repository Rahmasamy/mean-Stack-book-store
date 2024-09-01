const express = require("express");

const {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  DeleteBook,
  getBooksByCategoryId,
  getBooksByAuthorId,
} = require("../Controllers/BookController");
const { isAdmin, protect } = require("../Controllers/userController");


const router = express.Router();

router.route("/").get(getAllBooks).post(isAdmin, protect, createBook);

router
  .route("/book/:id")
  .get(getBookById)
  .put( protect, updateBook)
  .delete(isAdmin, protect, DeleteBook);

router.route("/category/:id").get(getBooksByCategoryId);

router.route("/author/:id").get(getBooksByAuthorId);
module.exports = router;
