const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')

router
    .post("/",verifyToken,productController.create)
    .get("/",verifyToken,productController.getAll)
    .get("/:id",verifyToken,productController.getById)
    .patch("/:id",verifyToken,productController.updateById)
    .patch("/undelete/:id",verifyToken,productController.undeleteById)
    .delete("/:id",verifyToken,productController.deleteById)

module.exports=router