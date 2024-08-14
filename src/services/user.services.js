require('dotenv').config()
const mongoose = require('mongoose')
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const makePasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


const createUserService = async (userdata) => {
    if (!userdata) {
        console.log("user not created")
    } else {
        const hashPassword = await makePasswordHash(userdata.password);
        userdata.password = hashPassword;
        const user = new userModel(userdata)
        const userDetail = await user.save()
        return userDetail
    }
}

const getUserService = async () => {
    const userData = await userModel.find()
    return userData
}

const updateUserService = async (userId, userDetail) => {
    console.log(userDetail, "user detail")
    const hashPassword = await makePasswordHash(userDetail.password);
    userDetail.password = hashPassword;
    console.log(userDetail, "user details after hash")
    const collectionData = userModel.findByIdAndUpdate({ _id: userId }, { ...userDetail }, { new: true })
    console.log(collectionData, "collection data")
    if (!collectionData) {
        return null;
    }
    return collectionData;
}

const deleteUserService = async (userId) => {
    const user = userModel.findByIdAndDelete(userId)
    return user
}

// const registerUserServices = async (userdata) => {
//     if (!userdata) {
//         console.log("user not registered")
//     } else {
//         const hashPassword = await makePasswordHash(userdata.password)
//         userdata.password = hashPassword
//         const registerUser = new userModel(userdata)
//         const registerDetails = await registerUser.save()
//         return registerDetails
//     }
// }

const loginUserService = async (userdata) => {
    const user = await userModel.findOne({ email: userdata.email })
    console.log(user, "useruseruseruseruseruseruseruseruseruser")
    if (!user) {
        return { message: "user not exist" }
    }

    const matchPassword = await bcrypt.compare(userdata.password, user.password)
    if (!matchPassword) {
        return { message: "enter correct passoword" }
    }
    console.log(user._id, "**********************************user._id")
    const token = jwt.sign({ _id: user._id, email: userdata.email, expireTime: '10d' }, process.env.TOKEN_SECRET_KEY)
    console.log(token, "token")
    return token
}
module.exports = { createUserService, getUserService, deleteUserService, updateUserService, loginUserService }  