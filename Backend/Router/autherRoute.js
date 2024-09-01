const express = require("express");
const { validationResult } = require("express-validator");
const {
  getAuthers,
  createAuther,
  getAuther,
  updateAuther,
  deleteAuther,
  uploadMultipleImages,
  getAutherByCatgoryId,
} = require("../Controllers/autherController");
const {
  getAuthervalidator,
  createAuthervalidator,
  updataAuthervalidator,
  deleteAuthervalidator,
} = require("../Utils/validators/autherValidators");
const userController = require("../Controllers/userController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.route("/").get(getAuthers).post(
  // createAuthervalidator,
  userController.isAdmin,
  userController.protect,
  createAuther
);

router
  .route("/:id")
  .get(getAuthervalidator, getAuther)
  .put(
    userController.isAdmin,
    userController.protect,
    // updataAuthervalidator,
    updateAuther
  )
  .delete(
    userController.isAdmin,
    userController.protect,
    deleteAuthervalidator,
    deleteAuther
  );
router.route("/author/:id").get(getAutherByCatgoryId);

module.exports = router;
