const serverPath = (req, res, next) => {
  const protocol = req.protocol;
  const hostName = req.get("host");
  const domain = `${protocol}://${hostName}/`;
  req.domain = domain;

  next();
};

module.exports = serverPath;
