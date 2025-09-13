const express=require("express");

const app=express();

app.use(express.json);

app.post("/users/signup",(req,res)=>{
    res.json({
        message:"Signup endpoint"
    })

});

app.post("/users/signin",(req,res)=>{
    res.json({
        message:"signIn end point"
    })
});

app.get("/users/purchases",(req,res)=>{
    res.json({
        message:""
    })
});

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