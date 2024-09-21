const { createReplyService, createNestedReplyService, getReplyService, updateReplyService, deleteReplyService, deleteReplyByAuthUserService } = require("../services/reply.services")

const createReplyController = async (req, res, next) => {
    try {
        const commentData = req.body
        // console.log(commentData, "==========commentData=======")
        const data = await createReplyService(commentData)
        if (data) {
            res.status(200).json({ data: data, message: "reply added successfully" })
        } else {
            return res.status(400).json({ message: "reply not added" })
        }
    } catch (error) {
        next(error)
    }
}
const createNestedReplyController = async (req, res, next) => {
    try {
        const replyId = req.params.id
        const replyData = req.body
        // console.log(replyId, "replyid");
        // console.log(replyData, "replyData");
        const data = await createNestedReplyService(replyId, replyData)
        return res.status(200).json({ data: data, message: "nested reply created successfully" })
    } catch (error) {
        next(error)
    }
}

const getReplyController = async (req, res, next) => {
    try {
        const parentId = req.params.id;
        // console.log(parentId, "commentId in controller")
        const data = await getReplyService(parentId)
        // console.log(data, "data in controller")
        if (data) {
            res.status(200).json({ data: data, message: "all replies " })
        }
    } catch (error) {
        next(error)
    }
}

const updateReplyController = async (req, res, next) => {
    try {
        const replyId = req.params.id
        const userId = req.user._id
        const replyData = req.body
        // console.log(replyData, "reply data in controller")
        const data = await updateReplyService(replyId, userId, replyData)
        return res.status(200).json({ data: data, message: "reply updated successfully" })
    } catch (error) {
        next(error)
    }
}

const deleteReplyController = async (req, res, next) => {
    try {
        const replyId = req.params.id
        const userId = req.user._id
        const data = await deleteReplyService(replyId, userId)
        return res.status(200).json({ data: data, message: "reply deleted successfully" })
    } catch (error) {
        next(error)
    }
}

const deleteReplyByAuthUser = async (req, res, next) => {
    try {
        const replyId = req.params.id
        const userId = req.user._id
        const data = await deleteReplyByAuthUserService(replyId, userId)
        return res.status(200).json({ data: data, message: "reply deleted successfully by authorized user" })
    } catch (error) {
        next(error)
    }
}
module.exports = { createReplyController, createNestedReplyController, getReplyController, updateReplyController, deleteReplyController, deleteReplyByAuthUser }  