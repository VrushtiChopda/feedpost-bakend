const { addCommentService, getCommentService } = require("../services/comment.services")

const addComment = async (req, res, next) => {
    try {
        const commentData = req.body
        const data = await addCommentService(commentData)
        return res.status(200).json({ data: data, message: "comment added successfully" })
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


module.exports = { addComment, getComment }