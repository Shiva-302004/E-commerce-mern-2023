const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})
const categorymodel=new mongoose.model("Category",schema)
module.exports=categorymodel