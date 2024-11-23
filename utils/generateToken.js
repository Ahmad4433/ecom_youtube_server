const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1d",
  });
  const refrehToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refrehToken,
  };
};

module.exports = generateToken;
