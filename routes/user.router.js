import {Router} from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({title:"Get all users details!"}));

userRouter.get("/:id",(req,res)=> res.send({title:`Get user details for user with id ${req.params.id}`}));

userRouter.post("/",(req,res)=> res.send({title:"Create a new User!"}));

userRouter.put("/:id",(req,res)=> res.send({title:`Update user with id ${req.params.id}`}));

export default userRouter;