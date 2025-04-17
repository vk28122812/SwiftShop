require("dotenv").config()
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_API)

router.post("/" ,async(req,res) => {
    const {products } = req.body;

    const referer = req.get("Referer") || process.env.CLIENT;
    // console.log(referer);
    const frontendUrl = new URL(referer).origin;

    const rootUrl = `${req.protocol}://${req.get("host")}`;
    const lineItems = products.map((product)=>({
        price_data: {
            currency:"inr",
            product_data:{
                name:product.title,
            },
            unit_amount: Math.round(product.price*100)
        },
        quantity:product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode:"payment",
        cancel_url: `${frontendUrl}/failed`,
        success_url: `${frontendUrl}/success`
        // cancel_url:  `${process.env.CLIENT}/failed` || "http://localhost:5173/failed",
        // success_url:`${process.env.CLIENT}/success` || "http://localhost:5173/success"
    })
    res.json({id:session.id})
    
})
module.exports = router;