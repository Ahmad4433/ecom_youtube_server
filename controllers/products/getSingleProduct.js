const Product = require("../../models/Product");

const getSingleProduct = async (req, res, next) => {
  const productId = req.query.productId;

  try {
    const findedProduct = await Product.findById(productId).populate([
      {
        path: "category",
        select: "-products -__v",
      },
      {
        path: "brand",
        select: "-products -__v",
      },
    ]);

    res.status(200).json({ message: "success", status: true, findedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleProduct;
