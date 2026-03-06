const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists" + " " + (isUserAlreadyExists.email == email?
            "Email already exists":"Username already exists")
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

async function loginController(req,res){
    const {email ,username,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {
                email:email
            },
            {
                username:username
            }
        ]
    })
    if(!user){
            res.status(404).json({
                message:"user not found"
            })
        }
    const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
        res.status(401).json({
            message:"invalid password"
        })
    }
    const token = jwt.sign({
        id:user._id,username:user.username
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"User loggedIn successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}