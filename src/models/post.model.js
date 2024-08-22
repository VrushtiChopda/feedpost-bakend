const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
    }
})

const postModel = mongoose.model('post-details', postSchema)

module.exports = postModel