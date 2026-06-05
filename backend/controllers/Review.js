const Review=require("../models/Review")

exports.create=async(req,res)=>{
    try {
        console.log(req.body);
        const created=await new Review(req.body).populate({path:'user',select:"-password"})
        await created.save()
        console.log("Review created")
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error posting review, please trying again later'})
    }
}

exports.getByProductId=async(req,res)=>{
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

        const totalDocs=await Review.find({product:id}).countDocuments().exec()
        const result=await Review.find({product:id}).skip(skip).limit(limit).populate('user').exec()

        console.log("user" + req.params.id + " | Review GetByProductID")
        res.set("X-total-Count",totalDocs)
        res.status(200).json(result)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting reviews for this product, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const updated=await Review.findByIdAndUpdate(id,req.body,{new:true}).populate('user')

        console.log("user" + req.params.id + " | Review UpdateByID")
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating review, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const deleted=await Review.findByIdAndDelete(id)
        console.log("user" + req.params.id + " | Review deleteById")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting review, please try again later'})
    }
}