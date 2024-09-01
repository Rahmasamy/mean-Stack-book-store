const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../Utils/apiError");
const multer = require("multer");
const path = require("path");
const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.getUsers = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const user = await UserModel.find({}).skip(skip).limit(limit);

  res.status(200).json({ results: user.length, page, data: user });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    return next(new ApiError(`No user found for this id ${id}`), 404);
  }
  res.status(200).json({ data: user });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, isAdmin } = req.body;

  const user = await UserModel.create({
    ...req.body,
  });

  res.status(201).json({ data: user });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, role, isAdmin, password } = req.body;
  console.log(req.body);
  if ((!role)) {
    return next(new ApiError("no data added to user"));
  }
  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password,
      role,
      isAdmin,
    },
    { new: true }
  );
  console.log(user);
  if (!user) {
    return next(new ApiError(`No user found for this id ${id}`), 404);
  }
  res.status(200).json({ data: user });
  next();
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      password: await bcrypt.hash(password, 12),
      PasswordChangeedAt: Date.now(),
    },
    { new: true }
  );

  if (!user) {
    return next(new ApiError(`No auther found for this id ${id}`), 404);
  }
  res.status(200).json({ data: user });
  next();
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findByIdAndDelete({ _id: id }, { new: true });

  if (!user) {
    return next(new ApiError(`No user found for this id ${id}`), 404);
  } else {
    res.status(200).json({ msg: `user is deleted for this id ${id}` });
  }
});
