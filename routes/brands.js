const express = require("express");
const addBrand = require("../controllers/brand/addBrand");
const updateBrand = require('../controllers/brand/updateBrand')
const router = express.Router();

router.post("/add", addBrand);
router.put('/update',updateBrand)


module.exports = router;
