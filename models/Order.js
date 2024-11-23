const mongoose = require("mongoose");

const orderSchmea = new mongoose.Schema(
  {
    products: [{ type: Object }],
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    orderTotal: { type: Number },
    status: { type: String, default: "processing" },
    address: { type: Object },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchmea);
