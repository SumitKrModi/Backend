const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isUserAlreadyFollowed = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isUserAlreadyFollowed){
        return res.status(400).json({
            message:`You are already following ${followeeUsername}`,
            follow:isUserAlreadyFollowed
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    })
    
    res.status(201).json({
        message:`You are following ${followeeUsername}`,
        follow:followRecord
    })

}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"You cannot unfollow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isUserAlreadyFollowed = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(!isUserAlreadyFollowed){
        return res.status(400).json({
            message:`You are not following ${followeeUsername}`,
            follow:isUserAlreadyFollowed
        })
    }

    const followRecord = await followModel.findByIdAndDelete(isUserAlreadyFollowed._id)
    
    res.status(200).json({
        message:`You are not following ${followeeUsername}`,
        follow:followRecord
    })
}

async function getFollowRequestsController(req,res){
    const username = req.user.username

    const requests = await followModel.find({
        followee: username,
        status: "pending"
    })

    res.status(200).json({
        message: "Follow requests fetched successfully",
        requests
    })
}

async function acceptFollowRequestController(req,res){
    const username = req.user.username
    const {requestId} = req.params

    const followRecord = await followModel.findOne({
        _id: requestId,
        followee: username,
        status: "pending"
    })

    if(!followRecord){
        return res.status(404).json({
            message: "Follow request not found or already processed"
        })
    }

    followRecord.status = "accepted"
    await followRecord.save()

    res.status(200).json({
        message: "Follow request accepted",
        follow: followRecord
    })
}

async function rejectFollowRequestController(req,res){
    const username = req.user.username
    const {requestId} = req.params

    const followRecord = await followModel.findOneAndDelete({
        _id: requestId,
        followee: username,
        status: "pending"
    })

    if(!followRecord){
        return res.status(404).json({
            message: "Follow request not found or already processed"
        })
    }

    res.status(200).json({
        message: "Follow request rejected",
        follow: followRecord
    })
}

async function getFollowersController(req,res){
    const username = req.user.username;
    const follows = await followModel.find({
        followee: username,
        status: "accepted"
    });
    const followerUsernames = follows.map(f => f.follower);
    const followers = await userModel.find({
        username: { $in: followerUsernames }
    });
    res.status(200).json({
        message: "Followers fetched successfully",
        followers
    });
}

async function getFollowingController(req,res){
    const username = req.user.username;
    const follows = await followModel.find({
        follower: username
    });
    const followeeUsernames = follows.map(f => f.followee);
    const following = await userModel.find({
        username: { $in: followeeUsernames }
    });
    res.status(200).json({
        message: "Following fetched successfully",
        following
    });
}

async function getAllUsersController(req,res){
    const username = req.user.username;
    
    // Find all users I am currently following or have requested to follow
    const myFollows = await followModel.find({ follower: username });
    const ignoreUsernames = myFollows.map(f => f.followee);
    // Add myself to the ignore list
    ignoreUsernames.push(username);

    const users = await userModel.find({
        username: { $nin: ignoreUsernames }
    });
    
    res.status(200).json({
        message: "Users fetched successfully",
        users
    });
}

async function removeFollowerController(req,res){
    const myUsername = req.user.username
    const followerUsername = req.params.username

    const followRecord = await followModel.findOneAndDelete({
        follower: followerUsername,
        followee: myUsername
    })

    if(!followRecord){
        return res.status(404).json({
            message: "Follower not found"
        })
    }

    res.status(200).json({
        message: `You removed ${followerUsername} from your followers`,
        follow: followRecord
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    getFollowRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    getFollowersController,
    getFollowingController,
    getAllUsersController,
    removeFollowerController
}