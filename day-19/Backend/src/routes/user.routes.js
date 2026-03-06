const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

userRouter.post("/follow/:username",identifyUser, userController.followUserController)
userRouter.post("/unfollow/:username",identifyUser, userController.unfollowUserController)

userRouter.get("/requests", identifyUser, userController.getFollowRequestsController)
userRouter.post("/accept/:requestId", identifyUser, userController.acceptFollowRequestController)
userRouter.post("/reject/:requestId", identifyUser, userController.rejectFollowRequestController)

module.exports = userRouter