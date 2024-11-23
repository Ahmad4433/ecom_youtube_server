const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    title: { type: String },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
