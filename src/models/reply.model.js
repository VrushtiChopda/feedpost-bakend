const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref: "comment-details",
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "post-details",
        required: true,
    },
    commentReply: {
        type: String,
        required: true
    }
}, { timestamps: true })

const replyModel = mongoose.model('comment-replies', replySchema)

module.exports = replyModel 