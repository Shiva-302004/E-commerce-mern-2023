const mongoose=require("mongoose")
const validator=require("validator")
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name feild is required"],
        minlength:3
    },
    email:{
        type:String,
        required:[true,"email feild is required"],
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("enter valid email")
            }
        }
    },
    password:{
        type:String,
        required:[true,"password feild is required"]
    },
    phone:{
        type:Number,
        required:[true,"this feild is required"]
    },
    address:{
        type:String,
        required:[true,"this feild is required"]
    },
    role:{
        type:Number,
        default:0
    },
    answer:{
        type:String,
        required:[true,"this feild is required"]
    }
},
{timestamps:true})
const usermodel=new mongoose.model("User",schema)
module.exports=usermodel