const stripe = require("../controllers/pay/stripe");
const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const products = require("../controllers/products");
const cart = require("../controllers/cart");
const router = require("express").Router();
router.use("/login", login);
router.use("/signup", signup);
router.use("/products", products)
router.use("/create-checkout-session",stripe )
router.use("/cart",cart );
router.use("/*", (req,res) => {
    res.status(404).json({error:true, message:"This route is not served"});    
})
module.exports = router;