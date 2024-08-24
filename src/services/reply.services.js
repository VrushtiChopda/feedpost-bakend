const mongoose = require("mongoose")
const createError = require("http-errors")
const commentModel = require("../models/comment.model")
const replyModel = require("../models/reply.model")

const createReplyService = async (commentReply) => {
    if (!commentReply) {
        return "comment reply not added"
    } else {
        const commentReplyData = new replyModel(commentReply)
        const data = await commentReplyData.save()
        return data
    }
}

const createNestedReplyService = async (replyId, replyData) => {
    console.log(replyData, "replyData");

    if (!replyData) {
        return "reply not added"
    }
    if (!replyId) {
        return "replyId not exist"
    }

    const nestedReplyData = new replyModel({
        parentId: replyId,
        userId: replyData.userId,
        postId: replyData.postId,
        commentReply: replyData.commentReply
    })

    console.log(nestedReplyData, "nestedReplyData");

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
    console.log(userId, "userId in service");

    const reply = await replyModel.findOne({ _id: replyId })
    console.log(reply, "reply");
    if (!reply) {
        throw createError(404, "this reply is not exist")
    }
    console.log(reply.userId , userId);
    
    if(reply.userId === userId){
        throw createError(401 , "unauthorized user can't update reply")
    }
    if (replyData) {
        const data = await replyModel.findOneAndUpdate({ _id: reply._id}, { ...replyData }, { new: true })
        return data
    } else {
        return "reply not updated"
    }
}
module.exports = { createReplyService, createNestedReplyService, getReplyService, updateReplyService }
