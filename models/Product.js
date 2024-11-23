const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    sale_price: { type: Number },
    purchase_price: { type: Number },
    detail: { type: String },
    stock: { type: Number },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Types.ObjectId, ref: "Brand" },
    image: [{ type: String }],
    is_active: { type: Boolean, default: true },
    review: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
