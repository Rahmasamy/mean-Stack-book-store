const mongoose = require("mongoose");

// 1 - create Schema
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title must be required"],
      minlength: [3, "title, must be at least 3 characters"],
      maxlength: [50, "titleis too long, maximum 50 characters"],
    },
    imagePaths: [{ type: String }],
    Author: { type: String, required: [true, "Author must be required"] },
    Category: { type: String, required: [true, "Category must be required"] },
    Author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auther",
      required: true,
    },
    Category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    rating: { type: Number },
    desc: { type: String },
    reviews: [{ type: String }],
    status: {
      type: String,
      enum: ["want_to_read", "currently_read", "read"],
      default: "want_to_read",
    },
    pdf: { type: String },
    // statusSelectedUser: { type: String },
    userRating: { type: String },
  },
  { timestamps: true }
);

// 2 - Create model

const BookModle = mongoose.model("book", BookSchema);

module.exports = BookModle;
