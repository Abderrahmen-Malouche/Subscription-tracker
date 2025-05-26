import {Router} from "express";
import { findUsers,findUserById } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/",findUsers);

userRouter.get("/:id",authorize,findUserById);

userRouter.post("/",(req,res)=> res.send({title:"Create a new User!"}));

userRouter.put("/:id",(req,res)=> res.send({title:`Update user with id ${req.params.id}`}));

export default userRouter;