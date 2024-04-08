const express=require("express");
const routerauth=express.Router();
const {register,login,user,forgotpassword,updateuser}=require("../controllers/registerControllers")
const {authmiddleware,isAdmin}=require("../middlewares/authmiddleware")
//routing

//routes for register/signup method:Post
routerauth.post("/api/v1/auth/register",register)
routerauth.post("/api/v1/auth/login",login)
//protected rotes
routerauth.post("/api/v1/auth/user",authmiddleware,isAdmin,user)
routerauth.get("/api/v1/auth/user-auth",authmiddleware,(req,res)=>{
    res.status(200).json({ok:true})
})
routerauth.get("/api/v1/auth/admin-auth",authmiddleware,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})
routerauth.post("/api/v1/auth/forgot-password",forgotpassword)
routerauth.put("/api/v1/auth/update-user",authmiddleware,updateuser)

module.exports=routerauth;