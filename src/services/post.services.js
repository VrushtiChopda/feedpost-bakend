const postModel = require('../models/post.model')
const createError = require('http-errors')
const createPostService = async (postdata) => {
    if (!postdata) {
        console.log("post not created")
        return "post not created"
    } else {
        const post = new postModel(postdata)
        const postDetail = await post.save()
        return postDetail
    }
}

const getPostService = async () => {
    const postDetail = await postModel.find()
    return postDetail
}

const updatePostService = async (postId, postdata, userData) => {
    const post = await postModel.findById(postId)
    if (!post) {
        throw createError(404, "this post is not exist")
    }
    if (post.userId.equals(userData._id)) {
        const postDetail = await postModel.findByIdAndUpdate({ _id: postId }, { ...postdata }, { new: true });
        return postDetail
    } else {
        console.log("unauthorized user can't update post")
        throw createError(401, "unauthorized user can't update post")
    }
};

const deletePostService = async (postId, userdata) => {
    const post = await postModel.findById(postId)
    if (!postId) {
        throw createError(404, "this post is not exist")
    }
    if (post.userId.equals(userdata._id)) {
        const post = await postModel.findByIdAndDelete(postId)
        return post
    } else {
        throw createError(401, "unauthorized user can't update post")
    }
}

module.exports = { createPostService, getPostService, updatePostService, deletePostService }