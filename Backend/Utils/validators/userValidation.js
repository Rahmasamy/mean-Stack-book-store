const { check } = require("express-validator");
const UserModel = require("../../Models/userModel");
const validationMiddleware = require("../../MiddleWare/validationMiddelware");

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 15 })
    .withMessage("Name must be at most 15 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (val) => {
      const user = await UserModel.findOne({ email: val });
      if (user) {
        return Promise.reject(new Error("Email already in use"));
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 characters long"),

  validationMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 characters long"),

  validationMiddleware,
];
