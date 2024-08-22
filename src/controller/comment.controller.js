const { addCommentService, getCommentService, updateCommentService, deleteCommentService, commentReplyService } = require("../services/comment.services")

const addComment = async (req, res, next) => {
    try {
        const commentData = req.body
        const data = await addCommentService(commentData)
        return res.status(200).json({ data: data, message: "comment added successfully" })
    } catch (error) {
        next(error)
    }
}

const addCommentReply = async (req, res, next) => {
    try {
        const commentId = req.params.id
        const commentReply = req.body
        console.log(commentId, "commentId in controller");
        console.log(commentReply, "commentReply");

        const data = await commentReplyService(commentId, commentReply)
        return res.status(200).json({ data: data, message: "comment's reply added" })
    } catch (error) {
        next(error)
    }
}

const getComment = async (req, res, next) => {
    try {
        const data = await getCommentService()
        return res.status(200).json({ data: data, message: "all comments" })
    } catch (error) {
        next(error)
    }
}

const updateComment = async (req, res, next) => {
    try {
        const commentId = req.params.id
        const commentData = req.body
        const userData = req.user
        console.log(userData, "--------userData in controller---------");

        const data = await updateCommentService(commentId, commentData, userData)
        return res.status(200).json({ data: data, message: "comment updated successfully" })
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.id
        const userData = req.user
        console.log(userData, "--------userData in controller---------");

        const data = await deleteCommentService(commentId, userData)
        return res.status(200).json({ data: data, message: "comment deleted successfully" })
    } catch (error) {
        next(error)
    }
}
module.exports = { addComment, addCommentReply, getComment, updateComment, deleteComment }