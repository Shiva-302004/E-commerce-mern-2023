const express=require("express")
const productrouter=express.Router()
const path=require("path")
const multer=require("multer")


const storage= multer.diskStorage({
    destination:"./uploads/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({storage:storage})
const {createProductController,allproducts,singleproducts,deleteProduct,searchproductcontroller ,productcountcontroller,updateproductcontroller, productFilterController, productperpage, Realatedproduct, SingleCategoryProduct}=require("../controllers/ProductController")
const {isAdmin,authmiddleware}=require("../middlewares/authmiddleware")
const formidable=require("express-formidable")
// productrouter.use("/images",express.static("uploads/images"))
productrouter.post("/uploadimage",upload.single('product'),(req,res)=>{
    res.status(200).json({
        success:true,
        msg:"product image uploaded successfully",
        path:`http://localhost:8000/images/${req.file.filename}`
    })
})
productrouter.post("/create-product",authmiddleware,isAdmin,createProductController)
productrouter.put("/update-product/:id",authmiddleware,isAdmin,updateproductcontroller)
productrouter.get("/all-products",allproducts)
productrouter.get("/single-products/:id",singleproducts)
// productrouter.get("/products-photo/:id",productphoto)
productrouter.delete("/delete-products/:id",deleteProduct)
productrouter.post("/filter-products",productFilterController)
productrouter.get("/product-count",productcountcontroller)
productrouter.get("/productper/:page",productperpage)
productrouter.get("/search-product/:keywords",searchproductcontroller)
productrouter.get("/related-product/:id/:pid",Realatedproduct)
productrouter.get("/category-product/:id",SingleCategoryProduct)
module.exports=productrouter