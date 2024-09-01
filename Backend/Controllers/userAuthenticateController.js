const BookModel = require("../Models/bookModle");
const asyncHandler = require("express-async-handler");
const oprationsUsermodel = require("../Models/OprationsUserModel");

/////////////////////////////////////////////
// Get All Books

exports.getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await BookModel.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ "error message": error.message });
  }
});

/////////////////////////////////////////////
// Get Books want to read

exports.BooksWantToRead = asyncHandler(async (req, res) => {
  try {
    const books = await BookModel.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ "error message": error.message });
  }
});

/////////////////////////////////////////////
// Get Books currently read

exports.BooksCurrentlyRead = asyncHandler(async (req, res) => {
  try {
    const books = await BookModel.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ "error message": error.message });
  }
});

