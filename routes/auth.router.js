import {Router} from 'express';

const authRouter = Router();

authRouter.get("/login",(req,res)=>res.send({title:"Login Successful!"}));

authRouter.get("/sign-up",(req,res)=>res.send({title:"Sign up successful!"}));

authRouter.get("/logout",(req,res)=>res.send({title:"Logout successful!"}));

export default authRouter;