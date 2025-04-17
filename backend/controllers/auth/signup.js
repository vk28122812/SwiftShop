const router = require("express").Router();
const User = require("../../models/user");

router.post("/", async(req,res)=>{
    // console.log(req.body);
    const { email,password,name } = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:true,message: "Username or email already exists"});
        }
        const newUser = new User({email, password,name});
        await newUser.save();
        res.status(200).json({message:"User created successfully"});
    }catch(error){
        console.log("Error in SignUp Controller");
        console.log(error)
        res.status(500).json({error:true,message: "Internal server error"});
    }
})
module.exports = router;