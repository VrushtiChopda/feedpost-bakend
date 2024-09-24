const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postImage: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAchieved: {
        type: Boolean,
        default: false
    }
})

const postModel = mongoose.model('post-details', postSchema)

module.exports = postModel  