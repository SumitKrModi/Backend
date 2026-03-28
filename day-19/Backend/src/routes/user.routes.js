const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

userRouter.post("/follow/:username",identifyUser, userController.followUserController)
userRouter.post("/unfollow/:username",identifyUser, userController.unfollowUserController)
userRouter.post("/remove/:username",identifyUser, userController.removeFollowerController)

userRouter.get("/requests", identifyUser, userController.getFollowRequestsController)
userRouter.post("/accept/:requestId", identifyUser, userController.acceptFollowRequestController)
userRouter.post("/reject/:requestId", identifyUser, userController.rejectFollowRequestController)
userRouter.get("/followers", identifyUser, userController.getFollowersController)
userRouter.get("/following", identifyUser, userController.getFollowingController)
userRouter.get("/all-users", identifyUser, userController.getAllUsersController)

module.exports = userRouter