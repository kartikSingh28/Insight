const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "No token provided. Authorization denied"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.id; // attach user id to request object
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = { userMiddleware };
