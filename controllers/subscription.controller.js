import subscriptionModel from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription =  await subscriptionModel.create({...req.body,user:req.user._id});
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export  const findUserSubscriptions= async (req, res, next) => {
try{
    const userId = req.params.id;
    if (!userId) {
        const error = new Error("User ID is required");
        error.statusCode = 400;
        return next(error);
    }
    if (!req.user._id.equals(userId)){
        const error = new Error("You are not authorized to access this subscription");
        error.statusCode = 403;
        return next(error);
    }
    const subscriptions = await subscriptionModel.find({ user: userId }).populate("user", "-password -__v");
    
    if (!subscriptions) {
        const error = new Error("No Subscriptions were found");
        error.statusCode = 404;
        return next(error);
    }
    
    res.status(200).json({
        success: true,
        message: "Subscription fetched successfully",
        data: subscriptions,
    });
}
catch(error){
    next(error);
  }
}
