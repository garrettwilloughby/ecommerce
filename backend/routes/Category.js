const express=require("express")
const categoryController=require("../controllers/Category")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')

router
    .get("/",verifyToken,categoryController.getAll)

    
module.exports=router