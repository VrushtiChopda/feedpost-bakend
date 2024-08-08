const mongoose = require('mongoose')

const commentReplySchema = new mongoose.Schema({
    parentCommentId: {
        type: mongoose.Schema.ObjectId,
        ref: "commentSchema",
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userSchema",
        required: true
    },
    commentReply: {
        type: String,
        required: true
    }
})

const commentReplyModel = mongoose.model('comment-replies', commentReplySchema)

module.exports = commentReplyModel 