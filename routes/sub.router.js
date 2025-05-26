import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription , findUserSubscriptions } from '../controllers/subscription.controller.js';
const subRouter = Router();

subRouter.get("/",(req,res)=>res.send({title:"Get all subscriptions!"}));

subRouter.get("/:id",(req,res)=>res.send({title:`Get subscription details for subscription with id ${req.params.id}`}));

subRouter.post("/",authorize,createSubscription);

subRouter.put("/:id",(req,res)=>res.send({title:`Update subscription with id ${req.params.id}`}));

subRouter.delete("/:id",(req,res)=>res.send({title:`Delete subscription with id ${req.params.id}`}));

subRouter.get("/user/:id",authorize,findUserSubscriptions);

subRouter.get("/:id/cancel",(req,res)=>res.send({title:`Cancel subscription with id ${req.params.id}`}));

subRouter.get("/upcoming-renewals",(req,res)=>res.send({title:"Get all upcoming renewals!"}));

export default subRouter;