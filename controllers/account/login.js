const User = require("../../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = new Error("all fields are required");
      error.statusCode = 400;
      throw error;
    }
    const formatedEmail = email.toLowerCase();
    const findedUser = await User.findOne({ email: formatedEmail });
    if (!findedUser) {
      const error = new Error("no user found");
      error.statusCode = 404;
      throw error;
    }

    const isPassMatch = await bcrypt.compare(password, findedUser.password);
    if (!isPassMatch) {
      const error = new Error("incorrect password");
      error.statusCode = 400;
      throw error;
    }

    const payload = {
      role: findedUser.role,
      id: findedUser._id,
      email: findedUser.email,
    };

    const { accessToken, refrehToken } = generateToken(payload);

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refrehToken);

    res
      .status(200)
      .json({
        message: "login successfully",
        status: true,
        user: {
          userId: findedUser._id,
          role: findedUser.role,
          email: findedUser.email,
        },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
