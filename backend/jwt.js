const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
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

const generateToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        path:"/"
    })

    return token;
}

module.exports = { generateToken, jwtAuthMiddleware };