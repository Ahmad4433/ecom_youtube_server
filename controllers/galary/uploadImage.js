const Galary = require("../../models/Galary");

const uploadImage = async (req, res, next) => {
  try {
    const newImage = new Galary({
      image: req.file.path,
    });

    const savedImage = await newImage.save();

    res.status(200).json({
      message: "image upload successfully",
      status: true,
      image: req.domain + savedImage.image,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadImage;
