const mongoose = require("mongoose")
const { HttpException } = require('../exceptions/HttpException')
const createError = require("http-errors")
const commentModel = require("../models/comment.model")
const replyModel = require("../models/reply.model")

const createReplyService = async (commentReply) => {
    if (!commentReply) {
        next(HttpException(400, "comment reply not added"));
    } else {
        const commentReplyData = new replyModel(commentReply)
        const data = await commentReplyData.save()
        return data
    }
}

const createNestedReplyService = async (replyId, replyData) => {
    // console.log(replyData, "replyData");
    if (!replyData) {
        next(HttpException(400, "reply not added"));
    }
    if (!replyId) {
        next(HttpException(404, "replyId not exist"));
    }

    const nestedReplyData = new replyModel({
        parentId: replyId,
        userId: replyData.userId,
        postId: replyData.postId,
        commentReply: replyData.commentReply
    })

    // console.log(nestedReplyData, "nestedReplyData");

    const data = await nestedReplyData.save()
    return data
}

const getReplyService = async () => {
    const commentReply = await commentModel.aggregate([
        {
            $lookup: {
                from: "comment-replies",
                localField: "_id",
                foreignField: "parentId",
                as: "replies"
            }
        },
        {
            $unwind: {
                path: "$replies",
            }
        },
        {
            $lookup: {
                from: "comment-replies",
                localField: "replies._id",
                foreignField: "parentId",
                as: "replies.nestedReplies"
            }
        },
        {
            $group: {
                _id: "$_id",
                comment: { $first: "$comment" },
                replies: { $push: "$replies" }
            }
        }
    ]);

    return commentReply;
}

const updateReplyService = async (replyId, userId, replyData) => {
    const reply = await replyModel.findOne({ _id: replyId })

    if (!reply) {
        next(HttpException(404, "this reply is not exist"));

        // throw createError(404, "this reply is not exist")
    }

    const data = await replyModel.findOneAndUpdate({ _id: reply._id, userId: userId }, { ...replyData }, { new: true })
    if (!data) {
        next(HttpException(401, "unauthorized user can't update reply"));

        throw createError(401, "unauthorized user can't update reply")
    }
    return data

}

const deleteReplyService = async (replyId, userId) => {
    const reply = await replyModel.findById(replyId)

    if (!reply) {
        next(HttpException(404, "this reply is not exist"));

        // throw createError(404, "this reply is not exist")
    }
    if (reply.userId.equals(userId)) {
        const data = await replyModel.findByIdAndDelete(replyId)
        return data
    } else {
        next(HttpException(401, "unauthorized user can't update reply"));

        // throw createError(401, "unauthorized person can't delete reply")
    }
}

module.exports = { createReplyService, createNestedReplyService, getReplyService, updateReplyService, deleteReplyService }  