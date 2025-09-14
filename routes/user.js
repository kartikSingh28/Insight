const { Router }=require("express");
const { userModel }=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");

//importing zod and bcrypt for securing password
const bcrypt=require("bcrypt");
const zod=require("zod");


const userRouter=Router();

userRouter.post("/signup",async (req,res)=>{

    const requireBody=zod.object({
        email:zod.string().email().min(5),
        password:zod.string().min(5),
        firstName:zod.string().min(3),
        lastName:zod.string().min(3),
    });

    //parsing and validating the incoming req body dta
    
    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.json({
            message:"Incoorect data format",
            error:parseDataWithSuccess.error,
        });
    }

    //extracting the validated and right email pass, first n last name from req.body
    const { email, password, firstName, lastName } = req.body;

    //hashing the password using bcrypt with salt round=10

    const hashedPassword= await bcrypt.hash(password,10);

    try {
        // add zod validation
        //use bcrypt to hash the password

        await userModel.create({
            email: email,
            password: hashedPassword,
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

userRouter.post("/signin", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email(),
        password: zod.string().min(5),
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
        res.json({ token });
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