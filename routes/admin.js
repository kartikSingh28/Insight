const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt=require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="kartikritik001";


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


adminRouter.post("/course", (req, res) => {
    res.json({
        message: "course endpoint"
    });
});

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "Course "
    });
});

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "course purchaed are"
    });
});

// Correct export statement
module.exports = { adminRouter };