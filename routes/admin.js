const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "SignupEndPoint"
    });
});

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "SignupEndPoint"
    });
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