const { mongoose } = require("mongoose")
const commentModel = require("../models/comment.model")
const createError = require('http-errors')
const addCommentService = async (commentData) => {
    if (!commentData) {
        return "comment not added"
    } else {
        const comment = new commentModel(commentData)
        const data = await comment.save()
        console.log(data)
        return
    }
}

const commentReplyService = async (commentId, commentData) => {
    console.log(commentId, "commentId");
    console.log(commentData, "commentData");
    if (!commentData) {
        return "comment's reply not added"
    } else {
        // const comment = await commentModel.findById(commentId)
        // console.log(comment , "comment");

        // const reply = new commentModel(commentData)
        // console.log(reply , "reply");

        // comment.replies.push(reply)
        // const data = await comment.save()
        const comment = await commentModel.findById(commentId);
        console.log(comment, "comment");

        if (!comment) {
            throw new Error("Comment not found");
        }

        const reply = new commentModel(commentData);
        console.log(reply, "reply");

        comment.replies.push(reply);
        const data = await comment.save();

        return data;
        }
}

const getCommentService = async () => {
    const comment = await commentModel.find().populate('userId').populate('replies.userId')
    console.log(comment, " -------------------------------- ");
    return comment
}

const updateCommentService = async (commentId, commentData, userData) => {
    const comment = await commentModel.findOne({ _id: commentId })
    if (!comment) {
        throw createError(404, "this comment is not exist")
    }

    const commentDetail = await commentModel.findOneAndUpdate({ _id: comment._id, userId: userData._id }, { ...commentData }, { new: true })

    if (!commentDetail) {
        throw createError(401, "unauthorized user can't update post")
    }
    return commentDetail
};

const deleteCommentService = async (commentId, userData) => {
    const comment = await commentModel.findById(commentId)
    if (!comment) {
        throw createError(404, "this comment is not exist")
    }
    console.log(comment.userId, "comment.userId");
    console.log(userData._id, "userData._id");

    if (comment.userId.equals(userData._id)) {
        const commentDetail = await commentModel.findByIdAndDelete(commentId)
        return commentDetail
    } else {
        throw createError(401, "unauthorized user can't delete post")
    }
}

module.exports = { addCommentService, commentReplyService, getCommentService, updateCommentService, deleteCommentService }