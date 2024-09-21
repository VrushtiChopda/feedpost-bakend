const mongoose = require("mongoose")
const { HttpException } = require('../exceptions/HttpException')
const commentModel = require("../models/comment.model")
const replyModel = require("../models/reply.model")

const createReplyService = async (commentReply) => {
    if (!commentReply) {
        throw HttpException(400, "comment reply not added");
    } else {
        const commentReplyData = new replyModel(commentReply)
        // console.log(commentReplyData, "commentReplyData")
        const data = await commentReplyData.save()
        return data
    }
}

const createNestedReplyService = async (replyId, replyData) => {
    // console.log(replyData, "replyData");
    if (!replyData) {
        throw HttpException(400, "reply not added");
    }
    if (!replyId) {
        throw HttpException(404, "replyId not exist");
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

const getReplyService = async (parentId) => {
    // console.log(parentId, "commentId in service")
    const commentReply = await replyModel.find({ parentId: new mongoose.Types.ObjectId(parentId) }).populate('userId')
    // const commentReply = await replyModel.aggregate([
    //     {
    //         $lookup: {
    //             from: 'comment-details',
    //             localField: '_id',
    //             foreignField: '_id',
    //             as: "comments"
    //         }
    //     }
    // ])
    // const commentReply = await commentModel.aggregate([
    //     {
    //         $lookup: {
    //             from: "comment-replies",
    //             localField: "_id",
    //             foreignField: "parentId",
    //             as: "replies"
    //         }
    //     },
    // {
    //     $unwind: {
    //         path: "$replies",
    //     }
    // },
    // {
    //     $lookup: {
    //         from: "comment-replies",
    //         localField: "replies._id",
    //         foreignField: "parentId",
    //         as: "replies.nestedReplies"
    //     }
    // },
    // {
    //     $group: {
    //         _id: "$_id",
    //         comment: { $first: "$comment" },
    //         replies: { $push: "$replies" }
    //     }
    // }
    // ]);

    // console.log(commentReply, "<-------comment reply---------->")
    return commentReply;
}

const updateReplyService = async (replyId, userId, replyData) => {
    // console.log(replyId, "replyId in service -----------------")
    // console.log(userId, "userId in service -----------------")
    // console.log(replyData, "replyData in service -----------------")
    const reply = await replyModel.findOne({ _id: replyId })

    if (!reply) {
        throw HttpException(404, "this reply is not exist");
    }

    const data = await replyModel.findOneAndUpdate({ _id: reply._id, userId: userId }, { ...replyData }, { new: true })
    if (!data) {
        throw HttpException(401, "unauthorized user can't update reply");
    }
    return data

}

const deleteReplyService = async (replyId, userId) => {
    const reply = await replyModel.findById(replyId)

    if (!reply) {
        throw HttpException(404, "this reply is not exist");
    }
    if (reply.userId.equals(userId)) {
        const data = await replyModel.findByIdAndDelete(replyId)
        return data
    } else {
        throw HttpException(401, "unauthorized user can't update reply");
    }
}

const deleteReplyByAuthUserService = async (replyId, userId) => {
    const reply = await replyModel.findById(replyId).populate({
        path: 'postId',
        model: 'post-details',  // Explicitly specify the model
        select: 'userId'  // Just populate userId
    });
    console.log(reply, "-----------  reply --------------")
    // if (!reply) {
    //     throw HttpException(404, "this reply is not exist");
    // }
    // console.log(reply.userId, "======= auth user =======", userId)
    // console.log(reply?.postId?.userId, "====== post user ========", userId)
    // if (reply.userId.equals(userId) || reply.postId.userId.equals(userId)) {
    //     const data = await replyModel.findByIdAndDelete(replyId)
    //     return data
    // } else {
    //     throw HttpException(401, "unauthorized user can't update reply");
    // }
}

module.exports = { createReplyService, createNestedReplyService, getReplyService, updateReplyService, deleteReplyService, deleteReplyByAuthUserService }  