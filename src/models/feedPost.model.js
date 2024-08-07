const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userSchema",
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

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
    }
})

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

const userModel = mongoose.model('user-details', userSchema)
const postModel = mongoose.model('post-details', postSchema)
const commentModel = mongoose.model('comment-details', commentSchema)
const commentReplyModel = mongoose.model('comment-replies', commentReplySchema)

module.exports = { userModel, postModel, commentModel, commentReplyModel }