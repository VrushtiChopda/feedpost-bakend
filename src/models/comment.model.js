const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "post-details",
        // required: true
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })

const commentModel = mongoose.model('comment-details', commentSchema)

module.exports = commentModel       