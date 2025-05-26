import express from "express";
import {PORT} from "./config/env.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import subRouter from "./routes/sub.router.js";
import authRouter from "./routes/auth.router.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import connectToDatabase from "./database/mongodb.js";

const app=express();

app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/sub",subRouter);



app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
})

export default app;