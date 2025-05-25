import {Router} from 'express';

const subRouter = Router();

subRouter.get("/",(req,res)=>res.send({title:"Get all subscriptions!"}));

subRouter.get("/:id",(req,res)=>res.send({title:`Get subscription details for subscription with id ${req.params.id}`}));

subRouter.post("/",(req,res)=>res.send({title:"Create a new subscription!"}));

subRouter.put("/:id",(req,res)=>res.send({title:`Update subscription with id ${req.params.id}`}));

subRouter.delete("/:id",(req,res)=>res.send({title:`Delete subscription with id ${req.params.id}`}));

subRouter.get("/user/:id",(req,res)=>res.send({title:`Get all subscriptions for user with id ${req.params.id}`}));

subRouter.get("/:id/cancel",(req,res)=>res.send({title:`Cancel subscription with id ${req.params.id}`}));

subRouter.get("/upcoming-renewals",(req,res)=>res.send({title:"Get all upcoming renewals!"}));

export default subRouter;