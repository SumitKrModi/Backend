const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const followRouter = require("./routes/user.routes")


app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/user",followRouter)

module.exports = app