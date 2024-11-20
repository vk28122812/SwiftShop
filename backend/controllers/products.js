const router = require("express").Router();
const Product = require("../models/product")
router.get("/", async(req,res) => {
    const products = await Product.find();
    res.status(200).json(products);
})
module.exports = router;