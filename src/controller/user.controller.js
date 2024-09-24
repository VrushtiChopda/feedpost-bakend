const mongoose = require('mongoose')
const userServices = require('../services/user.services')

const registerUser = async (req, res, next) => {
    try {
        const userDetail = req.body
        // console.log(userDetail, "register user detail")
        const data = await userServices.createUserService(userDetail)
        res.status(200).json({ data: data, message: "user registered successfully" })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const userDetail = req.body
        const data = await userServices.loginUserService(userDetail)
        res.status(200).json({ data: data, message: "user registered successfully" })
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const userDetail = req.body;
        const data = await userServices.createUserService(userDetail)
        res.status(200).json({ data: data, message: "user added successfully" })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        console.log(req.user, "auth user")
        id = req.user._id
        console.log(id, "getUser")
        const data = await userServices.getUserService(id)
        // console.log(data, "datadatadata")
        if (!data) {
            res.status(409).json({ message: "not found user data" })
        } else {
            res.status(200).json({ data: data, message: " user's data" })
        }
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const userDetail = req.body;
    userDetail.profile = req?.file?.path

    console.log(userDetail, " ----------- userDetail in controller")
    try {
        // console.log(userDetail, "user details")
        const data = await userServices.updateUserService(userId, userDetail);
        // console.log(data, "update user data in controller")
        if (!data) {
            res.status(409).json({ message: "user not updated.." })
        } else {
            res.status(200).json({ data: data, message: "user updated successfully" })
        }
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const data = await userServices.deleteUserService(userId)
        res.status(200).json({ message: "user deleted successfully" })
    } catch (error) {
        next(error)
    }
}
module.exports = { createUser, getUser, deleteUser, updateUser, registerUser, loginUser }