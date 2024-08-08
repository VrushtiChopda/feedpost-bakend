require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    jwt.decode(token)
}

module.exports = verifyToken