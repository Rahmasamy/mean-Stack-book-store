const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const categoryModel = require("../Models/categoryModle"); // Correct the typo
const { uploadFiles } = require("../MiddleWare/uploadImage");

// Get all categories
// exports.getCategories = asyncHandler(async (req, res) => {
//   const categories = await categoryModel.find();
//   res.status(200).json({ data: categories });
// });

exports.getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  const count = await categoryModel.countDocuments({});

  res.status(200).json({ count, page, data: categories });
});

// Create a new category
exports.createCategory = [
  uploadFiles,
  asyncHandler(async (req, res) => {
    const { name, desc } = req.body;
    // const imagePaths = req.file ? req.file.filename : null;
    const images =
    req.files["imagePaths"].map((file) => {
      if (file.filename.includes("pdf")) {
        pdf = file.filename;
      } else {
        return file.filename;
      }
    }) || [];
    const category = await categoryModel.create({
      name,
      slug: slugify(name),
      imagePaths:images,
      desc,
    });
    res.status(201).json({ data: category });
  }),
];

// Get a specific category by ID
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryModel.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ data: category });
});

// Update a category by ID
exports.updateCategory = [
  uploadFiles,
  asyncHandler(async (req, res) => {
  const name = req.body.name;

  // Check if name is provided before using slugify
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const slug = slugify(name);
  const images =
  req.files["imagePaths"].map((file) => {
    if (file.filename.includes("pdf")) {
      pdf = file.filename;
    } else {
      return file.filename;
    }
  }) || [];
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    // { name: name, slug: slug },
    // { new: true },
    {...req.body,imagePaths:images}
  );

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ data: category });
})];

// Delete a category by ID
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category deleted successfully" });
});
