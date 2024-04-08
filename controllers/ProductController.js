const productmodel= require("../models/Product")
const fs=require("fs")
const slugify=require("slugify")


const createProductController=async(req,res)=>{
    try{
        const {name,description,price,quantity,slug,category,shipping,photo}=req.body
        
        switch(true){
            case !name:
                return res.status(400).send("this name feild is required")
            case !description:
                return res.status(400).send("this name feild is required")
            case !price:
                return res.status(400).send("this name feild is required")
            case !quantity:
                return res.status(400).send("this quantity feild is required")
            case !category:
                return res.status(400).send("this category feild is required")
        }
        const product=new productmodel({name,description,price,quantity,category,photo,slug:slugify(name)})
        
        const newdata=await product.save()
        res.status(200).json({
            data:newdata,
            success:true,
            msg:"product created successfully"
        })
    }catch(err){
        res.status(400).json({
            msg:"err while running try block of create product AbortControlleller",
            err:err
        })
    }
}
const allproducts=async(req,res)=>{
    try{
        const data=await productmodel.find({}).limit(12).sort({createdAt:-1})
        res.status(200).json({
            totalcount:data.length,
            msg:"fetched all products",
            data:data,
        })
    }catch(err){
        res.status(400).json({
            msg:err
        })
    }
}
const singleproducts=async (req,res)=>{
    try{
            const {id}=req.params
            const data=await productmodel.findOne({_id:id})
            res.status(200).json({
                msg:"single product fetched",
                success:true,
                data:data
            })
    }catch(err){
        res.status(500).json({
            msg:"error in try block of single user"
        })
    }
}
const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const data =await productmodel.findByIdAndDelete(id)
        res.status(200).json({
            msg:"product delted successfully",
            data:data
        })
    }catch{
        res.status(500).json({
            msg:"error in delteproduct"
        })
    }
}
const updateproductcontroller=async(req,res)=>{
    try{
        const {name,description,price,quantity,slug,category,shipping,photo}=req.body
        
        switch(true){
            case !name:
                return res.status(400).send("this name feild is required")
            case !description:
                return res.status(400).send("this name feild is required")
            case !price:
                return res.status(400).send("this name feild is required")
            case !quantity:
                return res.status(400).send("this quantity feild is required")
            case !category:
                return res.status(400).send("this category feild is required")
        }
        const product=await productmodel.findByIdAndUpdate(req.params.id,{$set:{name,description,price,quantity,category,photo,shipping,slug}})
        res.status(200).json({
            data:product,
            success:true,
            msg:"product updated successfully"
        })
    }catch{
        res.status(500).json({
            msg:"error in try block update"
        })
    }
}
const productFilterController=async(req,res)=>{
    try{
        const {radio,checked}=req.body
        let args={};
        if(checked.length>0){
            args.category=checked
        }
        if(radio.length){
            args.price={$gte:radio[0],$lte:radio[1]}
        }
        const product=await productmodel.find(args)
        res.status(200).json({
            success:true,
            data:product
        })
    }catch(err){
        res.status(400).json({
            msg:"something ent wrong",
            err
        })
    }
}
const productcountcontroller=async(req,res)=>{
        try{
            const total=await productmodel.find({}).estimatedDocumentCount()
            res.status(200).json({
                success:true,
                count:total
            })

        }catch(err){
            res.status(400).json({msg:"error in product count"})
        }
}
const productperpage=async(req,res)=>{
    try{
        const perpage=6;
        const page=req.params.page||1
        const product= await productmodel.find({}).skip((page-1)*perpage).limit(perpage).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            data:product
        })
    }catch(err){
        res.status(400).json({
            msg:"error in loading per page ",
            err
        })
    }
}
const searchproductcontroller=async(req,res)=>{
    try{
        const keyword=req.params.keywords;
        const product=await productmodel.find({$or:[
            {name:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}}

        ]})
        res.json({
            data:product
        })
    }catch(err){
        res.status(400).json(err)
    }
}
const Realatedproduct=async(req,res)=>{
    try{

        const id=req.params.id
        const pid=req.params.pid
        const data=await productmodel.find({category:id,_id:{$ne:pid}}).skip(3).limit(6).sort({createdAt:-1})
        res.status(200).json({
            data:data,
            success:true
        })
    }catch(err){
        console.log(err)
    }
}
const SingleCategoryProduct=async(req,res)=>{
    const {id}=req.params
    const data=await productmodel.find({category:id})
    res.status(200).json({
        data:data,
        sucess:true
    })
}
module.exports={SingleCategoryProduct,Realatedproduct,searchproductcontroller,productperpage,productcountcontroller,createProductController,allproducts,singleproducts,deleteProduct,updateproductcontroller,productFilterController}