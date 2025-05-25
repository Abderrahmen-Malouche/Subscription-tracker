import express from "express";
import {PORT} from "./config/env.js";

import userRouter from "./routes/user.router.js";
import subRouter from "./routes/sub.router.js";
import authRouter from "./routes/auth.router.js";

const app=express();

app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/sub",subRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

export default app;