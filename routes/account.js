const express = require("express");
const register = require("../controllers/account/register");
const login = require("../controllers/account/login");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
