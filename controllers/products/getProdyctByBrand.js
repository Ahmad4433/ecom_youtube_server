const Product = require("../../models/Product");

const getProdctByBrand = async (req, res, next) => {
  const brand = req.query.brand;

  try {
    const list = await Product.find({ brand: brand }).populate([
      {
        path: "brand",
        select: "-products -__v",
      },
      {
        path: "category",
        select: "-products -__v",
      },
    ]);

    res.status(200).json({ message: "success", status: true, list });
  } catch (error) {
    next(error);
  }
};

module.exports = getProdctByBrand;
