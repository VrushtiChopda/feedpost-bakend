const mongoose = require('mongoose')
const userServices = require('../services/user.services')

const createUser = async (req, res, next) => {
    try {
        const userDetail = req.body
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
    const { userDetail } = req.body
    try {
        const data = await userServices.updateUserService(userDetail)
        res.status(200).json({ data: data, message: "user updated successfully" })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await userServices.deleteUserService({ _id: id })
        res.status(200).json({ message: "user deleted successfully" })
    } catch (error) {
        next(error)
    }
}

module.exports = { createUser, getUser, deleteUser, updateUser }