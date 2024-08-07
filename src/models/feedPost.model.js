const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
})

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
const SALT_WORK_FACTOR = 5;
userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};
const userModel = mongoose.model('user-details', userSchema)
const postModel = mongoose.model('post-details', postSchema)
const commentModel = mongoose.model('comment-details', commentSchema)
const commentReplyModel = mongoose.model('comment-replies', commentReplySchema)

module.exports = { userModel, postModel, commentModel, commentReplyModel }