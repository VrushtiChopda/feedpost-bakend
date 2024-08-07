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

module.exports = { createUserService, getUserService, deleteUserService, updateUserService }