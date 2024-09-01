const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  signupValidator,
  loginValidator,
} = require("../Utils/validators/userValidation");

const { signup, login } = require("../Controllers/userController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(loginValidator, login);

module.exports = router;
