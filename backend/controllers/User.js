const User=require("../models/User")

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
        }
        const result=(await User.findById(id)).toObject()
        delete result.password
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
        }
        const updated=(await User.findByIdAndUpdate(id,req.body,{new:true})).toObject()
        delete updated.password
        res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}