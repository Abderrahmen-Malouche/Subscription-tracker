import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js";


export const login = async (req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {email,name,password} = req.body;

        const existingUser= await User.findOne({email}).session(session);
        if(existingUser){
            const error = new Error("User already exists with this email.");
            error.statusCode = 409;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new User({
            name,
            email,
            password:hashedPassword
        });
        const newUsers= await user.create(user,{session});
        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:{
                user:newUsers[0],
                token
            }
        });

    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

