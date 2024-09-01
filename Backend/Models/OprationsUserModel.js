const mongoose = require("mongoose");

const oprationsUserSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      // required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    status: {
      type: String,
      enum: ["want_to_read", "current_read", "read"],
      default: "want_to_read",
    },
  },
  { timestamps: true }
);
// oprationsUserSchema.index({ book_id: 1, user_id: 1 }, { unique: true });
const oprationsUsermodel = mongoose.model("UserBook", oprationsUserSchema);

module.exports = oprationsUsermodel;
