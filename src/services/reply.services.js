const mongoose = require("mongoose")
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

const getReplyService = async () => {
    const commentReply = commentModel.aggregate([
        {
            $lookup: {
                from: "comment-replies",
                localField: "_id",
                foreignField: "parentId",
                as: "comment-reply"
            }
        }])
    return commentReply
}

module.exports = { createReplyService, getReplyService }