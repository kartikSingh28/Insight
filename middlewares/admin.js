const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "No token provided. Authorization denied"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.adminId = decoded.id; // attach admin id to request
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = { adminMiddleware };
