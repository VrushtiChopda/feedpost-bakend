require('dotenv').config()
const mongoose = require('mongoose')
const userModel = require('../models/user.model')
const { registerModel, loginModel } = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUserService = async (userdata) => {
    if (!userdata) {
        console.log("user not created")
    } else {
        const user = new userModel(userdata)
        const userDetail = await user.save()
        return userDetail
    }
}

const getUserService = async () => {
    const userData = await userModel.find()
    return userData
}

const updateUserService = async (userId, userData) => {
    const collectionData = userModel.findByIdAndUpdate({ _id: userId }, { ...userData }, { new: true });
    if (!collectionData) {
        return null;
    }
    return collectionData;
}

const deleteUserService = async () => {
    const user = userModel.deleteOne()
    return user
}

const registerUserServices = async (userdata) => {
    if (!userdata) {
        console.log("user not registered")
    } else {
        const registerUser = new registerModel(userdata)
        const registerDetails = await registerUser.save()
        return registerDetails
    }
}

const loginUserService = async (userdata) => {
    const user = await registerModel.findOne({ email: userdata.email })
    if (!user) {
        return { message: "user not registered" }
    }

    const matchPassword = await bcrypt.compare(userdata.password, user.password)
    if (!matchPassword) {
        return { message: "enter correct passoword" }
    }

    const token = jwt.sign({ _id: userdata._id, expireTime: '10h' }, process.env.TOKEN_SECRET_KEY,)
    console.log(token)
    return { token: token, expireTime: expireTime, message: "Login successfull" }
}
module.exports = { createUserService, getUserService, deleteUserService, updateUserService, registerUserServices, loginUserService }