const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
});
module.exports = mongoose.model('users', userSchema);