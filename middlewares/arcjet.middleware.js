import aj from "../config/arcjet.js";

const arcjetMiddlware = async(req,res,next)=>{
    if (process.env.NODE_ENV !== 'production') {
    return next();
  }
    try{
        const decision = await aj.protect(req,{requested:0});
        if(decision.isDenied()){
            if(decision.reason === "not_authorized") {
                const error = new Error("Not authorized");
                error.statusCode = 403;
                return next(error);
            }
            if(decision.reason.isRateLimit()) return res.status(402).json({
                error: "Rate limit exceeded. Please try again later."
            });
            if(decision.reason.isBot()) return res.status(403).json({
                error: "Bot traffic is not allowed."
            });
            return res.status(403).json({
                error: "Access denied due to security policies."
            })

        }

        next();
    }
    catch(error){
        console.error("Arcjet middleware error:", error);
        next(error);
    }
}
export default arcjetMiddlware;