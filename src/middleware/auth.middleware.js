require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const { HttpException } = require('../exceptions/HttpException')
const authMiddleware = async (req, res, next) => {
    try {
        const authResponse = await req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null
        console.log(authResponse, "auth Response")
        if (!authResponse) {
            next(HttpException(404, 'Token Expiry or Login First'));
        }

        const verifyToken = jwt.verify(authResponse, process.env.TOKEN_SECRET_KEY)
        console.log(verifyToken, "verfiy Token")
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
    } catch (error) {
        next(HttpException(403, 'token validation failed'))
    }
}

module.exports = { authMiddleware }