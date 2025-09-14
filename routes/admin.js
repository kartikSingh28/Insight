const { Router } = require("express");
const adminRouter = Router();
const { adminModel,courseModel } = require("../db");
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const { adminMiddleware } =require("../middlewares/admin");



adminRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body; // add zod validation
        //use bcrypt to hash the password

        await adminModel.create({
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


adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email, password });

        if (admin) {
            const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
            res.json({ token });
        } else {
            res.status(403).json({ message: "Incorrect credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

// course putting end point
adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId=req.userId;


    const { title,description,imageUrl,price }=req.body;

    const course =await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId

    })
    res.json({
        message: "course created",
        courseId:course._id
    });
});

adminRouter.put("/course",adminMiddleware,async (req, res) => {
    const adminId=req.userId;
    // note course id=adminid otherwise diff creators can update and change prices of dif creators

    const { title, description, imageUrl, price, courseId}=req.body;

    const course=await courseModel.updateOne({
        _id:courseId,// jaha pr ye course id hai waha update krdo
        creatorId:adminId// note implemented here
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"Course updated",
        courseId:course._id
    });
});

adminRouter.get("/course/bulk",adminMiddleware, async (req, res) => {

    const adminId=req.userId;

    const courses= await courseModel.find({
        creatorId:adminId
    });
    res.json({
        message: "course updated",
        courses
    });
});

// Correct export statement
module.exports = { adminRouter };