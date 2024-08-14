const postModel = require('../models/post.model')

const createPostService = async (postdata) => {
    if (!postdata) {
        console.log("post not created")
    } else {
        const post = new postModel(postdata)
        const postDetail = await post.save()
        // console.log(postDetail, "postDetail")
        return postDetail
    }
}

const getPostService = async () => {
    const postDetail = await postModel.find()
    return postDetail
}

const updatePostService = async (postId, postdata, userData) => {
    console.log(postId, "postId")
    const post = await postModel.findById(postId)
    console.log(post, "---------------post-----------")
    if (!post) {
        console.log("this post is not exist")
        return
    }
    console.log(userData, "---------userdata-------------")
    console.log(post.userId, "<-- postdata.userId --> ")
    console.log(userData._id, "<-- userData._id -->")
    if (post.userId !== userData._id) {
        console.log("unauthorized user can't update post")
        return
    } else {
        const postDetail = await postModel.findByIdAndUpdate({ _id: postId }, { ...postdata }, { new: true });
        console.log(postDetail, "----------update post------------")
        return postDetail
    }
};

const deletePostService = async (postId, userdata, postdata) => {
    console.log(userdata, "userData")
    if (!postId) {
        console.log("this post is not exist")
    } else if (postdata.userId !== userdata.userId) {
        console.log("unauthorized user can't delete post")
    } else {
        const post = await postModel.findByIdAndDelete(postId)
        console.log(post, "post of deleteService")
        return post
    }
}

module.exports = { createPostService, getPostService, updatePostService, deletePostService }