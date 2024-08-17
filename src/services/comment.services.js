const commentModel = require("../models/comment.model")

const addCommentService = async (commentData) => {
    if (!commentData) {
        return "comment not added"
    } else {
        const comment = new commentModel(commentData)
        const data = await comment.save()
        console.log(data)
        return
    }
}

const getCommentService = async () => {
    const comment = await commentModel.find()
    return comment
}

const updateCommentService = async (postId, postdata, userData) => {
    const post = await postModel.findById(postId)
    if (!post) {
        throw createError(404, "this post is not exist")
    }
    if (post.userId.equals(userData._id)) {
        const postDetail = await postModel.findByIdAndUpdate({ _id: postId }, { ...postdata }, { new: true });
        return postDetail
        // } else if (post.) {

    } else {
        console.log("unauthorized user can't update post")
        throw createError(401, "unauthorized user can't update post")
    }
};


module.exports = { addCommentService, getCommentService }