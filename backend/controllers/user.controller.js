const { generateToken } = require("../jwt");
const User = require("../models/user.model");

const createAccount = async (req, res) => {
    const { fullname, email, password } = req.body;
    if(!fullname || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try{
        const user = await User.findOne({ email });
        if(user) {
            return res.status(403).json({ message: "User already exists" });
        }
        // creating a new user
        const newUser = new User({
            fullname,
            email,
            password
        });

        const response = await newUser.save();

        // defining the payload
        const payload = {
            id: response._id,
            email: response.email
        }

        // generating the token
        const token = generateToken(res, payload);

        res.status(200).json({ message: "User created successfully", user: response, token, success: true });
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error", success: false });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try{
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(403).json({ message: "Invalid Credentials", success: false });
        }        

        // defining the payload
        const payload = {
            id: user._id,
            email: user.email
        }

        // generating the token
        const token = generateToken(res, payload);

        res.status(200).json({ message: "User logged in successfully", user, token, success: true });
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error", success: false });
    }
}

const getUser = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        res.status(200).json({ user, success: true });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "Internal server error", success: false });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully", success: true });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "Internal server error", success: false });
    }
}

module.exports = { createAccount, login, getUser, logout };