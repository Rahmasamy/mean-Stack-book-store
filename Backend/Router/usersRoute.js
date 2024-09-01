const express = require("express");
// const { validationResult } = require("express-validator");

const multer = require("multer");
const path = require("path");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadMultipleImages,
  changeUserPassword,
} = require("../Controllers/authControllers");
const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  updateChangePassword,
} = require("../Utils/validators/usersValidators");
const { protect, isAdmin } = require("../Controllers/userController");

const router = express.Router();

router
  .route("/changePassword/:id")
  .put(updateChangePassword, changeUserPassword);
router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
