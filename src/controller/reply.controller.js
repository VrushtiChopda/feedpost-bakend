const replyService = require("../services/reply.services")

const createReplyController = async (req, res, next) => {
    try {
        const commentReply = req.body
        const data = await replyService.createReplyService(commentReply)
        if (data) {
            res.status(200).json({ data: data, message: "reply added successfully" })
        } else {
            return res.status(400).json({ message: "reply not added" })
        }
    } catch (error) {
        next(error)
    }
}
const getReplyController = async (req, res, next) => {
    try {
        const data = await replyService.getReplyService()
        if (data) {
            res.status(200).json({ data: data, message: "all replies " })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = { createReplyController, getReplyController }