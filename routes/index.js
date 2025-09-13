const express=require("express");
const { userRouter }=require("./routes/user");

const app=express();

app.use(express.json);


app.use("/user",userRouter);

app.get("/course/purchase",(req,res)=>{
    res.json({
        message:""
    })
})

app.post("/courses",(req,res)=>{
    res.json({
        message:"Courses"
    })
});



app.listen(3000,()=>{
    console.log("Server started at port 3000");
})