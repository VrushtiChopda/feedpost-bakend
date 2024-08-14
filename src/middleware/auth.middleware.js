require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const authMiddleware = (req, res, next) => {
    const authResponse = req.headers["authorization"] ? req.headers["authorization"].split("Bearer ")[1] : null

    if (!authResponse) {
        next("token not exist")
    }

    const verifyToken = jwt.verify(authResponse, process.env.TOKEN_SECRET_KEY)
    if (!verifyToken) {
        next("invalid token")
    } else {
        next()
    }

    const userId = verifyToken._id
    const userDetail = userModel.findOne({ _id: userId })
    console.log(userDetail, "----------- userData after auth ---------------------")
    if (!userDetail) {
        next("unauthorized user")
    }

    req.user = userDetail
    console.log(userDetail, "auth middleware")
}

module.exports = { authMiddleware }