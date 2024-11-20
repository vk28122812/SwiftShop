const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require("dotenv").config();
const SECRET = process.env.SECRET;

router.post("/", async(req,res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error:true,message: "Invalid username or password"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(!isPasswordValid){
            return res.status(401).json({error:true,message: "Invalid username or password"});
        }
        const token = jwt.sign({userId:user._id}, SECRET, {expiresIn:'8h'});
        res.status(200).json({message:"Logged in successfully",token,user});
    }catch(error){
        console.log("Error in Login Controller");
        res.status(500).json({error:true,message:"Internal Server Error"});
    }
})
module.exports = router;