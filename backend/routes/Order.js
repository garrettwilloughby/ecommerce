const express=require('express')
const orderController=require("../controllers/Order")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { verifyAdmin } = require('../middleware/verifyAdmin')



router
    .post("/",verifyToken,orderController.create)
    .get("/",verifyToken,verifyAdmin,orderController.getAll)
    .get("/user/:id",verifyToken,orderController.getByUserId)
    .patch("/:id",verifyToken,orderController.updateById)


module.exports=router