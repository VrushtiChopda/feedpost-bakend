const { addCommentService, getCommentService, updateCommentService, deleteCommentService, commentReplyService, getCommentByPostIdService, deleteCommentByAuthorizeUserService } = require("../services/comment.services")

const addComment = async (req, res, next) => {
    try {
        const commentData = req.body
        const userId = req.user._id
        console.log(commentData, "--------- && ----------", userId)
        const data = await addCommentService(commentData, userId)
        return res.status(200).json({ data: data, message: "comment added successfully" })
    } catch (error) {
        next(error)
    }
}


const getComment = async (req, res, next) => {
    try {
        const data = await getCommentService()
        console.log(data);

        return res.status(200).json({ data: data, message: "all comments" })
    } catch (error) {
        next(error)
    }
}

const getCommentByPostId = async (req, res, next) => {
    try {
        const postId = req.params.id
        const data = await getCommentByPostIdService(postId)
        console.log(data, "data in controller")
        return res.status(200).json({ data: data, message: "all comment of the post" })
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

const deleteCommentByAuthorizeUser = async (req, res, next) => {
    try {
        const commentId = req.params.id
        const commentData = req.body
        const userData = req.user
        const data = await deleteCommentByAuthorizeUserService(commentId, userData)
        console.log(data, "deleteCommentByAuthorizeUser")
        return res.status(200).json({ data: data, message: "comment deleted successfully by authorized user" })
    } catch (error) {
        next(error)
    }
}
module.exports = { addComment, getComment, getCommentByPostId, updateComment, deleteComment, deleteCommentByAuthorizeUser }