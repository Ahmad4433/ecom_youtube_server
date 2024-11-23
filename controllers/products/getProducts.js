const Product = require("../../models/Product");

const getProducts = async (req, res, next) => {
  const pageNum = req.query.page;
  const pageLimit = 6;

  try {
    const productCount = await Product.countDocuments();
    const list = await Product.find()
      .populate([
        {
          path: "category",
          select: "-products -__v",
        },
        {
          path: "brand",
          select: "-products -__v",
        },
        {
          path: "review",
          select: "-product",
          populate: {
            path: "user",
            select: "name",
          },
        },
      ])
      .skip((pageNum - 1) * pageLimit)
      .limit(pageLimit)
      .sort({ _id: -1 });

    res
      .status(200)
      .json({
        message: "success",
        status: true,
        list,
        count: list.length,
        productCount,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
