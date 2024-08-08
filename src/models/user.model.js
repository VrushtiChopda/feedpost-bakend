const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    }
})

const registerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model('user-details', userSchema)
const registerModel = mongoose.model('register-details', registerSchema)
const loginModel = mongoose.model('login-details', loginSchema)

module.exports = { userModel, loginModel, registerModel }