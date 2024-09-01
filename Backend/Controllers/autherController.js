const AutherModle = require("../Models/autherModle");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../Utils/apiError");
const { uploadFiles } = require("../MiddleWare/uploadImage");



exports.getAuthers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const auther = await AutherModle.find({}).skip(skip).limit(limit);
  const count = await AutherModle.countDocuments({});

  res.status(200).json({ count, page, data: auther });
});

exports.getAuther = asyncHandler(async (req, res, next) => {
 
  const { id } = req.params;
  console.log({id})

  const auther = await AutherModle.findById(id);
  console.log(auther);
  if (!auther) {
    return next(new ApiError(`No auther found for this id ${id}`), 404);
  }
  res.status(200).json({ data: auther });
});

exports.getAutherByCatgoryId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const auther = await AutherModle.find({ Category_id: id });

  if (!auther) {
    return next(new ApiError(`No auther found for this id ${id}`), 404);
  }
  res.status(200).json({ data: auther });
});

exports.createAuther = [
  uploadFiles,
  asyncHandler(async (req, res) => {

    const { firstName, lastName, DateOfBirth, desc, Category_id } = req.body;
    const fullName = `${firstName} ${lastName}`;

    const images =
      req.files["imagePaths"].map((file) => {
        if (file.filename.includes("pdf")) {
          pdf = file.filename;
        } else {
          return file.filename;
        }
      }) || [];
    const auther = await AutherModle.create({
      firstName,
      lastName,
      Category_id,
      fullName: fullName,
      imagePaths: images,
      DateOfBirth,
      slug: slugify(fullName),
      desc,
      Category_id,
    });
    console.log("hhhhhhhhhhhhh");
    console.log(auther);

    res.status(201).json({ data: auther });
  }),
];
exports.updateAuther = [
  uploadFiles,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const images =
      req.files["imagePaths"].map((file) => {
        if (file.filename.includes("pdf")) {
          pdf = file.filename;
        } else {
          return file.filename;
        }
      }) || [];
    const auther = await AutherModle.findByIdAndUpdate(
      { _id: id },
      { ...req.body, imagePaths: images, pdf }
    );

    if (!auther) {
      return next(new ApiError(`No auther found for this id ${id}`), 404);
    } else {
      res.status(200).json({ data: auther });
    }
  }),
];

exports.deleteAuther = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName } = req.body;

  const auther = await AutherModle.findByIdAndDelete(
    { _id: id },
    { new: true }
  );

  if (!auther) {

    return next(new ApiError(`No auther found for this id ${id}`), 404);
  } else {
    res.status(200).json({ msg: `auther is deleted for this id ${id}` });
  }
});
