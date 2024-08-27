const { mongoose } = require("mongoose")
const { HttpException } = require('../exceptions/HttpException')
const commentModel = require("../models/comment.model")
const createError = require('http-errors')

const addCommentService = async (commentData) => {
    if (!commentData) {
        throw HttpException(400, 'comment not added');
    } else {
        const comment = new commentModel(commentData)
        const data = await comment.save()
        // console.log(data)
        return data
    }
}

const getCommentService = async () => {
    const comment = await commentModel.find().populate('userId').populate('replies.commentReply')
    // console.log(comment, " -------------------------------- ");
    return comment
}

const updateCommentService = async (commentId, commentData, userData) => {
    const comment = await commentModel.findOne({ _id: commentId })
    if (!comment) {
        throw HttpException(404, 'this comment is not exist');
    }

    const commentDetail = await commentModel.findOneAndUpdate({ _id: comment._id, userId: userData._id }, { ...commentData }, { new: true })

    if (!commentDetail) {
        throw HttpException(401, "unauthorized user can't update post");
    }
    return commentDetail
};

const deleteCommentService = async (commentId, userData) => {
    const comment = await commentModel.findById(commentId)
    if (!comment) {
        throw HttpException(404, "this comment is not exist");
    }
    // console.log(comment.userId, "comment.userId");
    // console.log(userData._id, "userData._id");

    if (comment.userId.equals(userData._id)) {
        const commentDetail = await commentModel.findByIdAndDelete(commentId)
        return commentDetail
    } else {
        throw HttpException(401, "unauthorized user can't delete post");
    }
}

module.exports = { addCommentService, getCommentService, updateCommentService, deleteCommentService }