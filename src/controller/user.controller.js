const mongoose = require('mongoose')
const userServices = require('../services/user.services')

const makePasswordHash = (password) => {
    //logic
    return
}
const createUser = async (req, res, next) => {
    try {
        const userDetail = req.body;
        const hashPassword = await makePasswordHash(userDetail.password);
        userDetail.password = hashPassword;
        const data = await userServices.createUserService(userDetail)
        res.status(200).json({ data: data, message: "user added successfully" })
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const data = await userServices.getUserService()
        res.status(200).json({ data: data, message: "all users data" })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const userDetail = req.body;
    try {
        const data = await userServices.updateUserService(userId, userDetail);
        if (!data) {
            res.status(409).json({ message: "user not updated.." })

        }
        res.status(200).json({ data: data, message: "user updated successfully" })
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

module.exports = { createUser, getUser, deleteUser, updateUser }