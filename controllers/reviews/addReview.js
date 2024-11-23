const Review = require("../../models/Review");
const Product = require("../../models/Product");
const addReview = async (req, res, next) => {
  const productId = req.query.productId;
  const { rating, message, image } = req.body;

  try {
    const newReview = new Review({
      rating,
      message,
      image,
      product: productId,
      user: req.userId,
    });

    const savedReview = await newReview.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { review: savedReview._id },
    });

    res
      .status(200)
      .json({ message: "review added successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = addReview;
