const { Router }=require("express");

const userRouter=Router();

userRouter.post("/signup",(req,res)=>{
    res.json({
        message:"SignupEndPoint"
    })
});

userRouter.post("/signin",(req,res)=>{
    res.json({
        message:"SignupEndPoint"
    })
});

userRouter.post("/purchases",(req,res)=>{
    res.json({
        message:"SignupEndPoint"
    })
});

module.exports={
    userRouter:userRouter
}