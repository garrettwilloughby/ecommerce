const express=require("express")
const userController=require("../controllers/User")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')

router
    .get("/:id",verifyToken,userController.getById)
    .patch("/:id",verifyToken,userController.updateById)

module.exports=router