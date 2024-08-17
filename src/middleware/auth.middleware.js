require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const authMiddleware = async (req, res, next) => {
    const authResponse = await req.headers["authorization"] ? req.headers["authorization"].split("Bearer ")[1] : null

    if (!authResponse) {
        return res.json({ message: "token not exist" })
    }

    const verifyToken = await jwt.verify(authResponse, process.env.TOKEN_SECRET_KEY)
    if (!verifyToken) {
        console.log('Invalid Token')
        return res.json({ message: "invalid token" })
    }

    const userId = verifyToken._id

    const userDetail = await userModel.findById(userId)
    if (!userDetail) {
        return res.json({ message: "unauthorized user" })
    }
    req.user = userDetail
    next()
}

module.exports = { authMiddleware }