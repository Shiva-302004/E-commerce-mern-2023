const express=require("express")
const model= require("../models/CategoryModel")
const CategoryRoute=express.Router()
const {authmiddleware,isAdmin}=require("../middlewares/authmiddleware")
const { categoryCreate,categoryUpdate,getallusers,getuser,delteCategory } = require("../controllers/CategoryController")

CategoryRoute.post("/create-category",authmiddleware,isAdmin,categoryCreate)
CategoryRoute.put("/update-category/:id",authmiddleware,isAdmin,categoryUpdate)
CategoryRoute.get("/all-category",getallusers)
CategoryRoute.get("/single-category/:id",getuser)
CategoryRoute.delete("/delete-category/:id",authmiddleware,isAdmin,delteCategory)
module.exports=CategoryRoute