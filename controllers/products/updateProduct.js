const Product = require("../../models/Product");
const Brand = require("../../models/Brand");
const Category = require("../../models/Category");
const updateProduct = async (req, res, next) => {
  const proudctId = req.query.productId;
  const {
    title,
    sale_price,
    purchase_price,
    stock,
    detail,
    brand,
    category,
    image,
  } = req.body;

  try {
    const findedProduct = await Product.findById(proudctId);
    if (!findedProduct) {
      const error = new Error("invalid product id");
      error.statusCode = 400;
      throw error;
    }

    const isExist = await Product.findOne({ title: title });

    findedProduct.title = isExist
      ? isExist.title === title
        ? findedProduct.title
        : title
      : title;
    findedProduct.sale_price = sale_price;
    findedProduct.purchase_price = purchase_price;
    findedProduct.stock = stock;
    findedProduct.detail = detail;
    findedProduct.image = image;
    findedProduct.brand = brand;
    findedProduct.category = category;

    await findedProduct.save();


    await Brand.findOneAndUpdate({products:proudctId},{$pull:{products:proudctId}})
    await Brand.findByIdAndUpdate(brand,{$push:{products:proudctId}})

    await Category.findOneAndUpdate({products:proudctId},{$pull:{products:proudctId}})
    await Category.findByIdAndUpdate(category,{$push:{products:proudctId}})


    res.status(200).json({
      message: "product updated successfully",
      status: true,
      findedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProduct;
