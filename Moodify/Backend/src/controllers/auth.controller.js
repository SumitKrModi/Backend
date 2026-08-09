const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const isUserRegistered = await mongoose.model('users').findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserRegistered) {
        return res.status(400).json({ message: "User already exists" });
    }



    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hash });

    await user.save();

    const token = jwt.sign({ id: user._id, name: user.username }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie("token",token);
    return res.status(201).json({ message: "User registered successfully",
        user: { id: user._id, username: user.username, email: user.email } });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        $or: [
            {email},
            {username}
        ]
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { 
            id: user._id,
            name: user.username 
        }, process.env.JWT_SECRET, 
        {
            expiresIn: '3d' 
        });
    
    res.cookie("token", token);
    
    return res.status(200).json({ message: "User logged in successfully",
        user: { id: user._id, username: user.username, email: user.email } });
};
module.exports = { registerUser, loginUser };