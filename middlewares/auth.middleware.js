import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
const authorize = async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token= req.headers.authorization.split(" ")[1];
        }
        if(!token){
            const error = new Error("Not authorized, no token");
            error.statusCode = 401;
            return next(error);
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            const error = new Error("Not authorized, user not found");
            error.statusCode = 401;
            return next(error);
        }
        req.user = user;
        next();
    }
    catch(error){
        next(error);
    }
}
export default authorize;