const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number },
    message: { type: String },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    image: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
