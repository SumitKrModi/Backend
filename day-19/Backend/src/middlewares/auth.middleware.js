const jwt = require("jsonwebtoken")


async function idntifyUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch(err){
        if(!token){
            return res.status(401).json({
                message:"Token invalid"
            })
        }
    }
    req.user = decoded;
    next()
}

module.exports = idntifyUser