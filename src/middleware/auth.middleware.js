require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const { HttpException } = require('../exceptions/HttpException')
const authMiddleware = async (req, res, next) => {
    const authResponse = await req.headers["authorization"] ? req.headers["authorization"].split("Bearer ")[1] : null

    if (!authResponse) {
        next(HttpException(404, 'Token Expiry or Login First'));
    }

    const verifyToken = await jwt.verify(authResponse, process.env.TOKEN_SECRET_KEY)
    if (!verifyToken) {
        console.log('Invalid Token')
        next(HttpException(401, 'Wrong authentication token'));
    }

    const userId = verifyToken._id

    const userDetail = await userModel.findById(userId)
    if (!userDetail) {
        next(HttpException(401, 'unauthorized user'));
    }
    req.user = userDetail
    next()
}

module.exports = { authMiddleware }