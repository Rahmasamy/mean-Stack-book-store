const { check } = require("express-validator");
const validationMiddleware = require("../../MiddleWare/validationMiddelware");
const UserModel = require("../../Models/userModel");

// Validator for getting a user
exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  validationMiddleware,
];

// Validator for creating a user
exports.createUserValidator = [
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

// Validator for updating a user
exports.updateUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 15 })
    .withMessage("Name must be at most 15 characters long"),
  check("role").notEmpty().withMessage("Role is required"),

  validationMiddleware,
];

// Validator for deleting a user
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  validationMiddleware,
];
exports.updateChangePassword = [
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 10 })
    .withMessage("password must be at least 10 characters long")
    .isLength({ max: 15 })
    .withMessage("Name must be at most 15 characters long"),
  check("role").optional().notEmpty().withMessage("Role is required"),

  validationMiddleware,
];
