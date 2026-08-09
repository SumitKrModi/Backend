const {Router} = require("express")
const router = Router()
const {register, login, logout} = require("../controllers/auth.controller")
const {registerUser,loginUser} = require("../controllers/auth.controller")

router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router