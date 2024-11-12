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
    isArchived: {
        type: Boolean,
        default: false
    },
    onCloudinaryLink: {
        type: String,
        default: '',
        trim: true
    },
    cloudPublicId: {
        type: String,
        default: '',
        trim: true
    },
})

const postModel = mongoose.model('post-details', postSchema)

module.exports = postModel  