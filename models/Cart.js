const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    quantity: { type: Number, default: 0 },
    cartTotal: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
