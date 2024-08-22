const mongoose = require('mongoose')

// const commentReply = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.ObjectId,
//         ref: "user",
//         required: true
//     },
//     commentReply: {
//         type: String,
//         required: true
//     }
// },)

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "post-details",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment-details"
    }]
}, { timestamps: true })

const commentModel = mongoose.model('comment-details', commentSchema)

module.exports = commentModel       