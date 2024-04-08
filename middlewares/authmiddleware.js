const dotenv=require("dotenv");
dotenv.config();
const SECRET_KEY=process.env.SECRET_KEY
const jwt=require("jsonwebtoken");
const usermodel = require("../models/userModel");

const authmiddleware=(req,res,next)=>{
    const token=req.headers.token
    const data=jwt.verify(token,SECRET_KEY)
    req.user=data.user
    next()
}
const isAdmin=async(req,res,next)=>{
    try{
        const users=await usermodel.findById(req.user.id)
        if(users.role!==1){
            return res.status(400).json({success:false,
            msg:"unauthorized"})
        }else{
            next()
        }
    }catch(err){
        res.status(400).json({msg:"error in middleware"})
    }
}
module.exports={authmiddleware,isAdmin}