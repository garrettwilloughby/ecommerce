const Wishlist = require("../models/Wishlist")

exports.create=async(req,res)=>{
    try {
        const created=await new Wishlist(req.body).populate({path:"product",populate:["brand"]})
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error adding product to wishlist, please try again later"})
    }
}
exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        let skip=0
        let limit=0

        if(req.query.page && req.query.limit){
            const pageSize=req.query.limit
            const page=req.query.page

            skip=pageSize*(page-1)
            limit=pageSize
        }

        const result=await Wishlist.find({user:id}).skip(skip).limit(limit).populate({path:"product",populate:['brand']})
        const totalResults=await Wishlist.find({user:id}).countDocuments().exec()

        console.log("user" + req.params.id + " | WishList getByUserId")

        res.set("X-Total-Count",totalResults)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching your wishlist, please try again later"})
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const updated=await Wishlist.findByIdAndUpdate(id,req.body,{new:true}).populate("product")

        console.log("user" + req.params.id + " | updateById")
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating your wishlist, please try again later"})
    }
}
exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const deleted=await Wishlist.findByIdAndDelete(id)

        console.log("user" + req.params.id + " | deleteById")
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting that product from wishlist, please try again later"})
    }
}