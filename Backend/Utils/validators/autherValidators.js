const { check } = require("express-validator");
const validationMiddelware = require("../../MiddleWare/validationMiddelware");

exports.getAuthervalidator = [
  check("id").isMongoId().withMessage("Invalid Auther id fromat"),
  validationMiddelware,
];

exports.createAuthervalidator = [
  check("firstName")
    .notEmpty()
    .withMessage("first name is re quired")
    .isLength({ min: 3 })
    .withMessage("to Short First Name, must be at least 3 characters")
    .isLength({ miax: 15 })
    .withMessage("Last name is too long, maximum 15 characters"),
  check("lastName")
    .notEmpty()
    .withMessage("last Name  is re quired")
    .isLength({ min: 3 })
    .withMessage("to Short last Name, must be at least 3 characters")
    .isLength({ miax: 15 })
    .withMessage("Last name is too long, maximum 15 characters"),
  validationMiddelware,
];
exports.updataAuthervalidator = [
  check("firstName")
    .notEmpty()
    .withMessage("first name is re quired")
    .isLength({ min: 3 })
    .withMessage("to Short First Name, must be at least 3 characters")
    .isLength({ miax: 15 })
    .withMessage("Last name is too long, maximum 15 characters"),
  check("lastName")
    .notEmpty()
    .withMessage("last Name  is re quired")
    .isLength({ min: 3 })
    .withMessage("to Short last Name, must be at least 3 characters")
    .isLength({ miax: 15 })
    .withMessage("Last name is too long, maximum 15 characters"),
  validationMiddelware,
];

exports.deleteAuthervalidator = [
  check("id").isMongoId().withMessage("Invalid Auther id fromat"),
  validationMiddelware,
];
