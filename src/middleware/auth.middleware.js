require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const authMiddleware = async (req, res, next) => {
    const authResponse = req.headers["authorization"] ? req.headers["authorization"].split("Bearer ")[1] : null

    if (!authResponse) {
        return res.json({ message: "token not exist" })
    }

    const verifyToken = jwt.verify(authResponse, process.env.TOKEN_SECRET_KEY)
    console.log("verifyToken =================", verifyToken)
    if (!verifyToken) {
        console.log('Invalid Token ')
        return res.json({ message: "invalid token" })
    }

    const userId = verifyToken._id
    console.log(userId, "+++++++++++++++userId in auth++++++++++++++++++")

    const userDetail = await userModel.findById(userId)
    console.log(userDetail, "----------- userData after auth ---------------------")
    if (!userDetail) {
        return res.json({ message: "unauthorized user" })
    }
    req.user = userDetail
    console.log(userDetail, "^^^^^^^^^^^^^^^^^^auth middleware^^^^^^^^^^^^^^^^^^^^")
    next()
}

module.exports = { authMiddleware }