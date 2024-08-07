const mongoose = require('mongoose')
const { userModel } = require('../models/feedPost.model')

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
    const userData = userModel.find()
    return userData
}

const updateUserService = async () => {
    const userData = userModel.findByIdAndUpdate()
    return userData
}

const deleteUserService = async () => {
    const user = userModel.deleteOne()
    return user
}

module.exports = { createUserService, getUserService, deleteUserService, updateUserService }