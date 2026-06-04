const express=require('express')
const orderController=require("../controllers/Order")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')


router
    .post("/",verifyToken,orderController.create)
    .get("/",verifyToken,orderController.getAll)
    .get("/user/:id",verifyToken,orderController.getByUserId)
    .patch("/:id",verifyToken,orderController.updateById)


module.exports=router