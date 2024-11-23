const Product = require("../../models/Product");
const joi = require("joi");
const Category = require("../../models/Category");
const Brand = require("../../models/Brand");

const addProduct = async (req, res, next) => {
  const { error: validationError } = validateProduct(req.body);

  const {
    title,
    sale_price,
    purchase_price,
    stock,
    detail,
    image,
    category,
    brand,
  } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const findedProduct = await Product.findOne({ title: title });

    if (findedProduct) {
      const error = new Error("this product name is already exist");
      error.statusCode = 400;
      throw error;
    }

    const findedBrand = await Brand.findOne({ title: brand }).select("_id");
    const findedCate = await Category.findOne({ title: category }).select(
      "_id"
    );

    const formatedBrand = findedBrand._id.toString();
    const formatedCat = findedCate._id.toString();

    const newProduct = new Product({
      title,
      sale_price,
      purchase_price,
      detail,
      category: formatedCat,
      brand: formatedBrand,
      stock,
      image,
    });

    const savedProduct = await newProduct.save();

    await Brand.findByIdAndUpdate(formatedBrand, {
      $push: { products: savedProduct._id },
    });
    await Category.findByIdAndUpdate(formatedCat, {
      $push: { products: savedProduct._id },
    });

    res
      .status(200)
      .json({ message: "product added successfully", product: savedProduct,status:true });
  } catch (error) {
    next(error);
  }
};

module.exports = addProduct;

function validateProduct(data) {
  const productSchema = joi.object({
    title: joi.string().required(),
    sale_price: joi.number().required(),
    purchase_price: joi.number().required(),
    detail: joi.string().required(),
    image: joi.array().required(),
    stock: joi.number().required(),
    brand: joi.string().required(),
    category: joi.string().required(),
  });

  return productSchema.validate(data);
}
