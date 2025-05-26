import {Router} from 'express';
import {login}  from '../controllers/auth.controller.js';
const authRouter = Router();

authRouter.get("/login",login);

authRouter.get("/sign-up",(req,res)=>res.send({title:"Sign up successful!"}));

authRouter.get("/logout",(req,res)=>res.send({title:"Logout successful!"}));

export default authRouter;