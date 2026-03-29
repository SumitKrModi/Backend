const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: [true,"username already exists"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique: [true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select: false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://imgs.search.brave.com/7p-MC2-TJ5Vg4FozPjkuOrugYZpPKCr73_P26JbJN3w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzY4LzUwLzU3/LzM2MF9GXzExNjg1/MDU3OTRfSUJDRWlh/ZnNJckhGSjA5ZTY1/UDJ2aDUxMTVDMVhJ/N2UuanBn"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel