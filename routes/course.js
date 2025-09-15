const { Router }=require("express");
const { userMiddleware }=require("../middlewares/user");
const { purchaseModel,courseModel }=require("../db");

const courseRouter=Router();

courseRouter.post("/purchase",async (req,res)=>{
    // expects the user to give money

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message:"You have successfully bought the course"

    })
});



courseRouter.get("/preview",async (req,res)=>{
    const courses=await courseModel.find({});

    res.json({
        courses
    })
})

module.exports={
    courseRouter: courseRouter
}