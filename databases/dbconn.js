const dotenv=require("dotenv")
dotenv.config()
const mongoose=require("mongoose")
const USERNAME_DATABASE=process.env.USERNAME_DATABASE
const PASSWORD_DATABASE=process.env.PASSWORD_DATABASE
const uri = `mongodb+srv://${USERNAME_DATABASE}:${PASSWORD_DATABASE}@atlascluster.gw1or1c.mongodb.net/mern-ecommerce?retryWrites=true&w=majority`;
const  clc=require("cli-color")
const db= async()=>{
   try{
    await mongoose.connect(uri)
    console.log(clc.bgBlue.red("database-connection for this app is successful"))
   }catch(err){
    console.log(clc.bgRed.white(err))
   }
}
module.exports=db;