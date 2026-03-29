const mongoose = require("mongoose")

const postSChema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl is requried to create an post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required for creating a post"]
    }
})

const postModel = mongoose.model("posts",postSChema)

module.exports = postModel