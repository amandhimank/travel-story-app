const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("auth middlware");
    if(!authHeader) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];

    try { 
        if(!token) {
            return res.status(403).json({ message: "Unauthorized! Token not found" });
        }    

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(403).json({ message: "Unauthorized! Invalid token" });
        }

        req.user = decoded;
        next();
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" })
}

module.exports = { generateToken, jwtAuthMiddleware };