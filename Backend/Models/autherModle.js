const mongoose = require("mongoose");

// 1 - create Schema
const autherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Auther first name is required"],
      minlength: [3, "First name is too short, must be at least 3 characters"],
      maxlength: [15, "First name is too long, maximum 15 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Auther last name is required"],
      minlength: [3, "Last name is too short, must be at least 3 characters"],
      maxlength: [15, "Last name is too long, maximum 15 characters"],
      lowercase: true,
      trim: true, // Corrected typo
    },
    fullName: {
      type: String,
      lowercase: true,
      trim: true, // Corrected typo
    },
    Category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    DateOfBirth: { type: Date },
    imagePaths: [{ type: String }],
    slug: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

// 2 - Create model

const AutherModle = mongoose.model("Auther", autherSchema);

module.exports = AutherModle;
