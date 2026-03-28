const postModel = require("../models/post.model")
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const likeModel = require("../models/like.model")

const imagekit = new imageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file)
    if (!req.file) {
  return res.status(400).json({
    message: "File not received. Check multer + key name",
  });
}

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName:"Test",
        folder:"insta-clone-posts"
    })
    res.send(file)

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    // Populate user details so the frontend has full user data
    await post.populate("user");

    res.status(201).json({
        message:"Post created successfully",
        post
    })
}
async function getPostController(req,res){
    const userId = req.user.id

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}
async function getPostDtailsController(req,res){
    
    const userId = req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden Content"
        })
    }
    return res.status(200).json({
        message:"Post Fetched Successfully",
        post
    })
}
async function likePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isUserAlreadyLiked = await likeModel.findOne({
        post:postId,
        user:username
    })
    if(isUserAlreadyLiked){
        return res.status(400).json({
            message:"You have already liked this post"
        })
    }
    const like = await likeModel.create({
        post:postId,
        user:username
    })
    return res.status(200).json({
        message:"Post Liked Successfully",
        like
    })
}
async function unLikePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isUserAlreadyLiked = await likeModel.findOne({
        post:postId,
        user:username
    })
    if(!isUserAlreadyLiked){
        return res.status(400).json({
            message:"You have not liked this post"
        })
    }
    const like = await likeModel.findOneAndDelete({
        _id:isUserAlreadyLiked._id
    })
    return res.status(200).json({
        message:"Post Unliked Successfully",
        like
    })
}
async function getFeedController(req,res){
    const user = req.user
    const posts = await postModel.find().populate("user").lean()
    const updatedPosts = await Promise.all(posts.map(async (post) => {
        const isLiked = await likeModel.findOne({
            post:post._id,
            user:user.username
        })

        post.isLiked = !!isLiked

        return post
    }))

    res.status(200).json({
        message:"Posts fetched successfully.",
        posts:updatedPosts
    })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDtailsController,
    likePostController,
    unLikePostController,
    getFeedController
}