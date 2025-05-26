import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const findUsers = async (req, res, next) => {
    try{
        const users= await User.find({});
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    }
    catch(error){
        next(error);
    }
}
export const findUserById= async (req,res,next)=>{
    try{
        const userId= req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            const error = new Error("Invalid user ID");
            error.statusCode = 400;
            return next(error);
        }
        const user = await User.findById(userId).select("-password -__v");
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });

    }
    catch(error){
        next(error);
    }
}