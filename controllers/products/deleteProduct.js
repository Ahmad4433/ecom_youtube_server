const Product = require("../../models/Product");
const Brand = require("../../models/Brand");
const Category = require("../../models/Category");

const deleteProduct = async (req, res, next) => {
  const productId = req.query.productId;

  try {
    await Product.findByIdAndDelete(productId);
    await Category.findOneAndUpdate(
      { products: productId },
      { $pull: { products: productId } }
    );
    await Brand.findOneAndUpdate(
      { products: productId },
      { $pull: { products: productId } }
    );

    res
      .status(200)
      .json({ message: "product deleted  successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;
