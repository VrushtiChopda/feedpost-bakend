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

// const commentReplyService = async (commentId, commentData) => {
//     console.log(commentId, "commentId");
//     console.log(commentData, "commentData");

//     if (!commentData) {
//         return "Comment's reply not added";
//     }

//     const comment = await commentModel.findById(commentId);
//     console.log(comment, "comment");

//     if (!comment) {
//         throw new Error("Comment not found");
//     }

//     // Create a new reply comment
//     const commentReply = new commentModel({
//         userId: commentData.userId,
//         postId: comment.postId, // Inherit the postId from the original comment
//         comment: commentData.comment
//     });

//     // Save the reply comment
//     const savedReply = await commentReply.save();
//     console.log(savedReply, "----- savedReply -----");

//     // Push the saved reply's ObjectId into the original comment's replies array
//     comment.replies.push(savedReply._id);

//     // Save the original comment with the new reply added
//     const updatedComment = await comment.save();

//     return updatedComment;
// }

const commentReplyService = async (commentId, commentData) => {
    console.log(commentId, "commentId");
    console.log(commentData, "commentData");

    if (!commentData) {
        return "Comment's reply not added";
    }

    const comment = await commentModel.findById(commentId);
    console.log(comment, "comment");

    if (!comment) {
        throw new Error("Comment not found");
    }
    const commentReply = new commentModel({
        userId: commentData.userId,
        postId: comment.postId,
        comment: commentData.comment
    });
    comment.replies.push(commentReply._id);
    const updatedComment = await comment.save();

    return updatedComment;
}

// const commentReplyService = async (commentId, commentData) => {
//     console.log(commentId, "commentId");
//     console.log(commentData, "commentData");
//     if (!commentData) {
//         return "comment's reply not added"
//     } else {
//         const comment = await commentModel.findById(commentId);
//         console.log(comment, "comment");

//         if (!comment) {
//             throw createError("Comment not found");
//         }

//         const commentReply = new commentModel({
//             userId: commentData.userId,
//             postId: commentData.postId,
//             comment: commentData.comment
//         })
//         console.log(commentReply, "--------reply---------");

//         const savedReply = await commentReply.save()
//         console.log(savedReply, "----- savedReply -----");

//         savedReply.replies.push(commentData)
//         // comment.replies.push(commentReply);
//         const data = await comment.save();

//         return data;
//     }
// }







// const commentReply = new commentModel({
//     userId: commentData.userId,
//     postId: commentData.postId,
//     comment: commentData.comment
// })

// const savedReply = await commentReply.save()
// const comment = await commentModel.findById(commentId);
// console.log(comment, "comment");

// if (!comment) {
//     throw createError("Comment not found");
// }

// savedReply.replies.push(savedReply._id)
// const updatedComment = await savedReply.save()
// const getCommentService = async () => {
//     const comment = await commentModel.find()
//     return comment
// }

const getCommentService = async () => {
    const comment = await commentModel.find().populate('userId').populate('replies.commentReply')
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