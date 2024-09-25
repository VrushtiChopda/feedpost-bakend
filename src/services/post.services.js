const postModel = require('../models/post.model')
const { HttpException } = require('../exceptions/HttpException')
const fs = require('fs');
const path = require('path');

const createPostService = async (postdata, userData) => {
    if (!postdata) {
        throw HttpException(404, 'post not created');
    } else {
        postdata.userId = userData._id;
        const post = new postModel(postdata)
        const postDetail = await post.save()
        return postDetail
    }
}

const getPostService = async () => {
    const postDetail = await postModel.find({
        isArchived: false
    })
    return postDetail
}

const getPostByUserIdService = async (userId) => {
    // console.log(userId, "userID")
    const post = await postModel.find({
        userId: userId,
        isArchived: false
    })
    // console.log(post, "----------all post-----------")
    return post
}

const updatePostService = async (postId, postdata, userData) => {
    // console.log(postdata, "---------- postdata -----------");
    const post = await postModel.findById(postId);
    if (!post) {
        throw HttpException(404, 'This post does not exist');
    }

    if (!post.userId.equals(userData._id)) {
        throw HttpException(401, "Unauthorized user can't update post");
    }

    //----------- delete existing image ----------
    if (postdata.postImage && post.postImage) {
        const currentImagePath = path.join(__dirname, '../..', post.postImage);
        if (fs.existsSync(currentImagePath)) {
            fs.unlink(currentImagePath, (err) => {
                if (err) {
                    console.error('Failed to delete existing image:', err);
                }
            });
        } else {
            console.log('File does not exist, cannot delete:', currentImagePath);
        }
    }

    const postDetail = await postModel.findByIdAndUpdate(
        { _id: postId },
        { ...postdata },
        { new: true }
    );

    return postDetail;
};

// const updatePostService = async (postId, postdata, userData) => {
//     console.log(postdata, "---------- postdata -----------")
//     const post = await postModel.findById(postId)
//     if (!post) {
//         throw HttpException(404, 'this post is not exist');
//     }
//     if (post.userId.equals(userData._id)) {
//         const postDetail = await postModel.findByIdAndUpdate({ _id: postId }, { ...postdata }, { new: true });
//         return postDetail
//     } else {
//         throw HttpException(401, "unauthorized user can't update post");
//     }
// };

const deletePostService = async (postId, userdata) => {
    const post = await postModel.findById(postId)
    if (!post) {
        throw HttpException(404, "this post is not exist")
    }
    if (post.userId.equals(userdata._id)) {
        const post = await postModel.findByIdAndDelete(postId)
        return post
    } else {
        throw HttpException(401, "unauthorized user can't update post")
    }
}

const archivePostService = async (postId, userId, archive) => {
    const post = await postModel.findById(postId)
    console.log(post, "--------- post in archive -------------")
    if (post.isArchived === true) {
        return 'post is already archived'
    }
    console.log(archive, "---------- archive in service -0----------")
    console.log(post.userId, "------------- post's user Id ---------")
    console.log(userId, "-------------- auth user --------------------")
    if (post.userId.equals(userId)) {
        const updatePost = await postModel.findOneAndUpdate({ _id: postId }, { isArchived: archive })
        console.log(updatePost, "updatePost")
        return updatePost
    } else {
        throw HttpException(401, "unauthorized user can't update post")
    }
}

const getArchivedPostService = async () => {
    const postData = await postModel.find({ isArchived: true })
    console.log(postData, "-------- postData in service --------")
    return postData
}
module.exports = { createPostService, getPostService, getPostByUserIdService, updatePostService, deletePostService, archivePostService, getArchivedPostService }