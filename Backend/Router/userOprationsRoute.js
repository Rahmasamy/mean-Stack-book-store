const express = require("express");
const {
  addBookToUserOption,
  updateBookToUserOption,
  getAllBooksInUserDashbord,
  getBooksByStatus,
} = require("../Controllers/userOprationsController");
const { protect } = require("../Controllers/userController");
const router = express.Router();

router.route("/").post(addBookToUserOption);

router.route("/:id").get(getAllBooksInUserDashbord).put(updateBookToUserOption);
router.route("/:id/status/:status").get(getBooksByStatus);

module.exports = router;
