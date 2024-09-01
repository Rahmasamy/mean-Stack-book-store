const oprationsUsermodel = require("../Models/OprationsUserModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../Utils/apiError");
const BookModle = require("../Models/bookModle");

exports.getAllBooksInUserDashbord = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const { id } = req.params;
  const userBooks = await oprationsUsermodel
    .find({ user_id: id })
    .skip(skip)
    .limit(limit)
    .populate(
      "book_id",
      "title Author imagePaths rating status userRating statusSelectedUser"
    )
    .exec();

  res.status(200).json({ results: userBooks.length, page, data: userBooks });
});








exports.addBookToUserOption = asyncHandler(async (req, res, next) => {
  const { book_id, status, user_id } = req.body;

  const checkIfBookExists = await oprationsUsermodel.findOne({
    book_id,
    user_id,
  });

  if (checkIfBookExists) {
    return res
      .status(400)
      .json({ message: "Book already exists in the user's list" });
  }

  const dataBook = await BookModle.findById(book_id);

  if (!dataBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  const userBook = new oprationsUsermodel({
    book_id,
    user_id,
    status,
  });

  await userBook.save();
  res.status(201).json({ data: userBook, dataBook });
});

exports.updateBookToUserOption = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { book_id, status, user_id } = req.body;

  try {
    const updatedUserBook = await oprationsUsermodel.findByIdAndUpdate(
      id,
      { book_id, status, user_id },
      { new: true }
    );

    if (!updatedUserBook) {
      return res.status(404).json({ message: "UserBook not found" });
    }

    res.status(200).json(updatedUserBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

exports.getBooksByStatus = asyncHandler(async (req, res) => {
  const { status, id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const userBooks = await oprationsUsermodel
    .find({ status: status, user_id: id })
    .skip(skip)
    .limit(limit)
    .populate("book_id", "title Author imagePaths rating");

  if (!userBooks.length) {
    return res
      .status(404)
      .json({ message: "No books found with this status." });
  }

  res.status(200).json({ results: userBooks.length, page, data: userBooks });
});
