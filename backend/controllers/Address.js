const Address = require("../models/Address")

exports.create=async(req,res)=>{
    try {
        const created=new Address(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding address, please trying again later'})
    }
}

exports.getByUserId = async (req, res) => {
    try {
        const {id}=req.params
        if (req.params != req.user) {
            res.status(404).json({message:"User not authorized for this action"})
        }
        const results=await Address.find({user:id})
        console.log("user" + id + " | Address getByUserId")
        res.status(200).json(results)
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching addresses, please try again later'})
    }
};

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params != req.user) {
            res.status(404).json({message:"User not authorized for this action"})
        }
        const updated=await Address.findByIdAndUpdate(id,req.body,{new:true})
        console.log("user" + id + " | Address updateById")
        console.log(updated);
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating address, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params != req.user) {
            res.status(404).json({message:"User not authorized for this action"})
        }
        const deleted=await Address.findByIdAndDelete(id)
        console.log("user" + id + " | Address deleteById")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting address, please try again later'})
    }
}


