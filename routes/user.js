const { Router }=require("express");
const { userModel }=require("../db");
const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD="alad123";

const userRouter=Router();

userRouter.post("/signup",async (req,res)=>{
    try {
        const { email, password, firstName, lastName } = req.body; // add zod validation
        //use bcrypt to hash the password

        await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            message: "SignUp Succeded"
        });

    
    } catch (err) {
        res.status(500).json({
            message: "Error while signing up",
            error: err.message
        });
    }
});

userRouter.post("/signin",async (req,res)=>{
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email, password });

        if (user) {
            const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
            res.json({ token });
        } else {
            res.status(403).json({ message: "Incorrect credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

userRouter.post("/purchases",(req,res)=>{
    res.json({
        message:"SignupEndPoint"
    })
});

module.exports={
    userRouter:userRouter
}