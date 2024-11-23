const Brand = require("../../models/Brand");

const addBrand = async (req, res, next) => {
  const { title, image } = req.body;

  try {
    if (!title || title.trim().length < 2) {
      const error = new Error("invliad brand name");
      error.statusCode = 400;
      throw error;
    }

    const findedBrand = await Brand.findOne({ title: title });
    if (findedBrand) {
      const error = new Error("this brand name is already exist");
      error.statusCode = 400;
      throw error;
    }

    const newBrand = new Brand({
      title: title,
      image: image,
    });

    const savedBrand = await newBrand.save();

    res
      .status(200)
      .json({ message: "brand added successfully", savedBrand, status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = addBrand;
