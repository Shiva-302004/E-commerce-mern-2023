const categorymodel=require("../models/CategoryModel")
const slugify=require("slugify")
const categoryCreate=async(req,res)=>{
        try{
            const {name}=req.body
            if(!name){
                res.status(400).json({msg:"name is required"})
            }
            const data=await categorymodel.findOne({name})
            if(data){
                res.status(200).json({
                    msg:"category already exist",
                    success:true
                })
            }else{
                const data=new categorymodel({name,slug:slugify(name)})
                const newdata=await data.save()
                res.status(201).json({
                    msg:"category created successfully",
                    data:newdata,
                    success:true
                })
            }
        }catch(err){
            res.status(500).json({msg:err,desc:"unable to run try block of catagory create",success:false})
        }
}
const categoryUpdate=async (req,res)=>{
    const {name}=req.body
    const {id}=req.params
    try{
        if(!name){
            res.status(400).json({msg:"name is required",success:false})
        }
        // const {id}=req.user.id
        const data =await categorymodel.updateOne({_id:id},{$set:{name:name,slug:slugify(name)}},{new:true})
        res.status(200).json({
            msg:"category updated succesfully",
            data:data,
            success:true
        })
    }catch(err){
        res.status(500).json({
            msg:false,
            err:err
        })
    }
}
const getallusers=async(req,res)=>{
    const data=await categorymodel.find({})
    res.status(200).json({
        data:data,
        success:true
    })
}
const getuser=async(req,res)=>{
    try{
        const {id}=req.params
        const data= await categorymodel.findOne({_id:id})
        if(data){
            res.status(200).json({
                data:data,
                msg:"fetch category successfully",
                success:true
            })
        }else{
            res.status(400).json({
                msg:"category not exist",
                success:false
            })
        }
    }catch(err){
        res.status(500).json({err:err})
    }
}
const delteCategory=async(req,res)=>{
    const {id}=req.params
    try{
        const data=await categorymodel.findByIdAndDelete({_id:id})
        res.status(200).json({
            msg:"deleted successfully",
            data:data,
            success:true
        })
    }catch(err){
        res.status(400).json({
            msg:":error in try blockof delete category",
            err:err
        })
    }
}
module.exports={categoryCreate,categoryUpdate,getallusers,getuser,delteCategory}