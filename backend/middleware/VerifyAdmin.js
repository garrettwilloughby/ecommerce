require('dotenv').config()
const jwt=require('jsonwebtoken')
const { sanitizeUser } = require('../utils/SanitizeUser')
const User = require("../models/User");

exports.verifyAdmin=async(req,res,next)=>{
    try {
        const isAdmin = (await User.findOne({ name: req.user }))?.isAdmin === true;
        req.isAdmin = isAdmin;
        if (isAdmin) {
            next();
        }
        // if user is not admin, throw error over permissions
        return res.status(401).json({message:"User does not have permissions for action"})
        
    } catch (error) {

        console.log(error);
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        } 
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        } 
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}