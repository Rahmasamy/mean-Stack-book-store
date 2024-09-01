const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      minlength: [3, "category name must be at least 3 characters"],
      maxlength: [50, "category name must be maximum 50 characters"],
    },
    imagePaths:  [{ type: String }],
    desc: { type: String },
  },
  { timestamps: true }
);

const categoryModle = mongoose.model("category", categorySchema);

module.exports = categoryModle;
