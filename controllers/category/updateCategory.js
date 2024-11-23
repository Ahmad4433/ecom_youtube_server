const Category = require("../../models/Category");

const updateCategory = async (req, res, next) => {
  const category = req.query.category;
  const { title, image } = req.body;

  try {
    const findedCat = await Category.findById(category);
    if (!findedCat) {
      const error = new Error("invalid category id");
      error.statusCode = 400;
      throw error;
    }

    const isExist = await Category.findOne({ title: title });

    findedCat.title = isExist
      ? isExist.title === title
        ? findedCat.title
        : title
      : title;
    findedCat.image = image;

    await findedCat.save();

    res.status(200).json({
      message: "category updated successfully",
      status: true,
      findedCat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCategory;
