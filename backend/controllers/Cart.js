const Cart=require('../models/Cart')

exports.create=async(req,res)=>{
    try {
        const created=await new Cart(req.body).populate({path:"product",populate:{path:"brand"}});
        await created.save()
        console.log("user" + req.user + " | Cart Create")
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product to cart, please trying again later'})
    }
}

exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const result = await Cart.find({ user: id }).populate({path:"product",populate:{path:"brand"}});
        console.log("user" + req.params.id + " | Cart getByUserId")
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const updated=await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate({path:"product",populate:{path:"brand"}});

        console.log("user" + req.params.id + " | Cart updateById")
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error updating cart items, please trying again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        const deleted=await Cart.findByIdAndDelete(id)

        console.log("user" + req.params.id + " | Cart deleteById")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error deleting cart item, please trying again later'})
    }
}

exports.deleteByUserId=async(req,res)=>{

    try {
        const {id}=req.params
        if (req.params.id != req.user) {
            res.status(401).json({message:"User not authorized for this action"})
            return;
        }
        await Cart.deleteMany({user:id})

        console.log("user" + req.params.id + " | Cart deleteByUserId")
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Some Error occured while resetting your cart"})
    }

}