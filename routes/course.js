const { Router }=require("express");

const courseRouter=Router();

courseRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"course Purchase endpoint"

    })
});

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"Course previewendpoint endpoint"
    })
});

module.exports={
    courseRouter: courseRouter
}