const fs = require("fs");

const checkImgMimetype = (req, res, next) => {
  try {
    if (
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      const error = new Error("invalid image formate");
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
    next(error);
  }
};

module.exports = checkImgMimetype;
