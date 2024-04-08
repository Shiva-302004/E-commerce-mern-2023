const dotenv=require("dotenv");
dotenv.config();
const SECRET_KEY=process.env.SECRET_KEY
const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")
const hashpassword=async(password)=>{
        const pass=await bcryptjs.hash(password,10)
        return pass
}
const authtoken=async (payload)=>{
    const token=await jwt.sign(payload,SECRET_KEY,{expiresIn:"7d"})
    return token
}
const passwordcompare=async(passworddb,passworduser)=>{
    const data= bcryptjs.compare(passworduser,passworddb)
    return data
}
module.exports={hashpassword,authtoken,passwordcompare}