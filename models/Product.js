const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        contentType:String
    },
    shipping:{
        type:Number,
        default:0
    }
},{timestamps:true})

const productmodel=new mongoose.model("Product",schema)
module.exports=productmodel