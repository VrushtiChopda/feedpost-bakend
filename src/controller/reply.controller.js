const { createReplyService, createNestedReplyService, getReplyService, updateReplyService } = require("../services/reply.services")

const createReplyController = async (req, res, next) => {
    try {
        const commentReply = req.body
        const data = await createReplyService(commentReply)
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
        console.log(replyId, "replyid");
        console.log(replyData, "replyData");
        const data = await createNestedReplyService(replyId, replyData)
        return res.status(200).json({ data: data, message: "nested reply created successfully" })
    } catch (error) {
        next(error)
    }
}

const getReplyController = async (req, res, next) => {
    try {
        const data = await getReplyService()
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
        const data = await updateReplyService(replyId, userId, replyData)
        return res.status(200).json({ data: data, message: "reply updated successfully" })
    } catch (error) {
        next(error)
    }
}
module.exports = { createReplyController, createNestedReplyController, getReplyController, updateReplyController }  