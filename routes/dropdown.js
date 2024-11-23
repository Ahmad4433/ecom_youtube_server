const express = require("express");
const categoryDropdown = require("../controllers/dropdown/category");
const brandDropdown = require("../controllers/dropdown/brand");
const router = express.Router();

router.get("/category", categoryDropdown);
router.get("/brand", brandDropdown);



module.exports = router;
