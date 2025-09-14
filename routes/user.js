const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const bcrypt = require("bcrypt");
const zod = require("zod");

const userRouter = Router();

// Signup
userRouter.post("/signup", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5),
        firstName: zod.string().min(3),
        lastName: zod.string().min(3),
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.json({ message: "SignUp Succeeded" });
    } catch (err) {
        res.status(500).json({
            message: "Error while signing up",
            error: err.message,
        });
    }
});

// Signin
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
        res.status(500).json({
            message: "Something went wrong",
            error: err.message,
        });
    }
});

// Purchases
userRouter.post("/purchases", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const purchases = await purchaseModel.find({ userId });

        if (purchases.length === 0) {
            return res.status(404).json({ message: "No purchases found" });
        }

        const purchaseCourseIds = purchases.map(p => p.courseId);

        const coursesData = await courseModel.find({
            _id: { $in: purchaseCourseIds },
        });

        return res.status(200).json({
            purchases,
            courses: coursesData,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error while fetching purchases",
            error: err.message,
        });
    }
});

module.exports = { userRouter };
