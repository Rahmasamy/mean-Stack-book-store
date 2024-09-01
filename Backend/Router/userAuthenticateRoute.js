const express = require("express");
const BookModle = require("../Models/bookModle");

const {
  getAllBooks,
  BooksWantToRead,
  BooksCurrentlyRead
} = require("../Controllers/userAuthenticateController");

const router = express.Router();

router.route("/all-books").get(getAllBooks);

router.route("/books-want-to-read").get(BooksWantToRead);

router.route("/books-currently-read").get(BooksCurrentlyRead);

module.exports = router;
