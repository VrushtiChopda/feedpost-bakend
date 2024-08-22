const mongoose = require('mongoose')

const commentReply = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userSchema",
        required: true
    },
    commentReply: {
        type: String,
        required: true
    }
}, {timestamps :true})

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userSchema",
        required: true
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "postSchema",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies : [commentReply]
})

const commentModel = mongoose.model('comment-details', commentSchema)

module.exports = commentModel