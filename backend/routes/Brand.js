const express=require("express")
const brandController=require("../controllers/Brand")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')

router
    .get("/",verifyToken,brandController.getAll)

module.exports=router