const User=require("../models/User")

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const result=(await User.findById(id)).toObject()
        delete result.password
        console.log("user" + req.params.id + " | User GetById")
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const updated=(await User.findByIdAndUpdate(id,req.body,{new:true})).toObject()
        delete updated.password
        console.log("user" + req.params.id + " | UpdateByID")
        res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}