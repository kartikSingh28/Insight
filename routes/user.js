const { Router }=require("express");

const userRouter=Router();

userRouter.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    res.json({
        message:"SignupEndPoint"
    })
});

userRouter.post("/signin",(req,res)=>{
    const userName=req.body.userName;
    const password=req.body.password;
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