const Cart = require("../models/cart");
const Product = require("../models/product");
const router = require("express").Router();

router.get("/:userId",async(req,res)=>{
    const {userId} = req.params;
    try{
        const cart = await Cart.findOne({userId}).populate('items.productId');
        if(!cart){
            return res.status(404).json({error: "Cart not found!"});
        }
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({error: error.message});
    }
})
router.post("/modify-cart", async(req,res)=>{
    const {userId, productId, quantity} = req.body;
    try{
        const product = await Product.findById(productId);
        if(!product){
            res.status(404).json({error: "Product not found"});
        }
        const cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId, items: [], totalPrice: 0});
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if(itemIndex === -1){
            if(quantity > 0){
                cart.items.push({productId, quantity, price:price*quantity});
            }
        }else{
            if(quantity <= 0){
                cart.items.splice(itemIndex, 1);
            }else{
                cart.items[itemIndex].quantity = quantity;
                cart.items[itemIndex].price = product.price
            }
        }
        await cart.save();
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports = router;