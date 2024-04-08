const { hashpassword, authtoken, passwordcompare } = require("../helpers/authhelper")
const usermodel = require("../models/userModel")
const clc = require("cli-color")
const validator=require("validator")
const register = async (req, res) => {
    const { name, email, password, phone, address ,answer} = req.body
    try {
        if (!name) {
            return res.send("this name feild is required")
        }
        if (!address) {
            return res.send("this address feild is required")
        }
        if (!phone) {
            return res.send("this phone feild is required")
        }
        if (!password) {
            return res.send("this password feild is required")
        }
        if (!email) {
            return res.send("this password feild is required")
        }

        if (validator.isEmail(email)) {
            const data = await usermodel.findOne({ email })
            if (data) {
                console.log(clc.magenta(data))
                res.status(201).json({ msg: "user already exist", desc: "please use another email", success: true })
            } else {
                const hashedpassword = await hashpassword(password)
                const newdata = new usermodel({ name, email, password: hashedpassword, phone, address,answer })
                const user = await newdata.save()
                console.log(clc.red(user))
                const payload = {
                    user: {
                        id: user._id
                    }
                }
                const token = await authtoken(payload)
                res.status(200).json({
                    msg:"user registed succesfully",
                    data: user,
                    token: token,
                    success: true
                })
            }
        } else {
            res.send("this is not an email")
        }
    } catch (err) {
        res.status(400).json({ msg: err, desc: "cant run try block of register", success: false })
    }


}
const login = async (req, res) => {
    try {
        const {password,email}=req.body
        if (!password) {
            return res.send("this password feild is required")
        }

        if (validator.isEmail(email)) {
            const data = await usermodel.findOne({ email })
            if (!data) {
                console.log(clc.magenta(data))
                res.status(201).json({ msg: "user not exist exist", desc: "please use another email", success: false })
            } else {
                const isCompare=passwordcompare(password,data.password)
                if(isCompare){

                    console.log(clc.red(data))
                    const payload = {
                        user: {
                            id: data._id
                        }
                    }
                    const token = await authtoken(payload)
                    res.status(200).json({
                        msg:"login successful",
                        data: {
                            id:data._id,
                            name:data.name,
                            email:data.email,
                            phone:data.phone,
                            address:data.address,
                            role:data.role
                        },
                        token: token,
                        success: true
                    })
                }else{
                    res.status(201).json({msg:"pasword not matched",success:false})
                }
            }
        } else {
            res.send("enter valid email")
        }
    } catch (err) {
        res.status(400).json({ msg: err, desc: "cant run try block of login", success: false })
    }
}
const user=(req,res)=>{
    const id=req.user.id
    console.log(id)
    res.status(200).json({msg:"welcome admin",id:id})
}
const forgotpassword=async(req,res)=>{
    try{
        const {email,answer,newpassword}=req.body
        if(!email){
            res.status(200).json({msg:"please enter email"})
        }
        if(!newpassword){
            res.status(200).json({msg:"please enter newpassword"})
        }
        if(!answer){
            res.status(200).json({msg:"please enter answer"})
        }
        const user=await usermodel.findOne({email})
        if(!user){
            res.status(404).json({msg:"wrong email"})
        }else{
            const hashedpassword=await hashpassword(newpassword)
            const isCompare=await passwordcompare(user.password,newpassword) 
            if(isCompare){
                res.status(400).json({
                    msg:" password is same as earlier ",
                    success:false
                })
            }else{
                // const user=await usermodel.findOne({email})
                if(answer===user.answer){
                    const data= await usermodel.findByIdAndUpdate(user._id,{password:hashedpassword})
                    res.status(200).json({msg:"password changed successfully",data:data,success:true})
                }else{
                    res.status(200).json({msg:"invalid answer",success:false})
                }
            }
        }

    }catch(err){
        res.status(500).json({
            err:err,
            success:false
        })
    }
}
const updateuser=async(req,res)=>{
    const id=req.user.id;
    const {name,phone,password,email,address}=req.body
    const user=await usermodel.findOne({_id:req.user.id})
    if(!password && password.length<6){
        return res.json({msg:"password is greater than 6"})
    }
    const hashedpassword=password?await hashpassword(password):user.password
    const data=await usermodel.findByIdAndUpdate({_id:id},{
        name:name||user.name,
        email:email||user.email,
        phone:phone||user.phone,
        password:hashedpassword||user.password,
        address:address||user.address
    },{new:true})
    res.status(200).json({
        data:data,
        msg:"user updated",
        success:true
    })
}
module.exports = { register, login ,user,forgotpassword,updateuser};