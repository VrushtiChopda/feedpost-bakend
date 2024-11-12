const postModel = require('../models/post.model')
const { HttpException } = require('../exceptions/HttpException')
const fs = require('fs');
const path = require('path');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

const createPostService = async (postdata, userData) => {
    console.log(postdata, "------------- postdata --------------")
    if (!postdata) {
        throw HttpException(404, 'post not created');
    }
    if (postdata.postImage !== undefined && postdata.postImage !== null) {
        const cloudImageLink = await uploadImage(postdata?.postImage)
        console.log(cloudImageLink, "---------- cloudImageLink --------------")
        postdata.onCloudinaryLink = await cloudImageLink?.secure_url
        postdata.cloudPublicId = await cloudImageLink?.public_id
    }
    postdata.userId = userData._id;
    const post = new postModel(postdata)
    const postDetail = await post.save()
    return postDetail

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
    // console.log(post, "---------- post -------------")
    if (!post) {
        throw new HttpException(404, 'This post does not exist');
    }

    // Check if user is authorized to update the post
    if (!post.userId.equals(userData._id)) {
        throw new HttpException(401, "Unauthorized user can't update post");
    }

    // Handle Cloudinary image update
    if (postdata.postImage && postdata.postImage !== post.onCloudinaryLink) {
        // console.log(post.cloudPublicId, "<-----post.cloudPublicId------------>")
        if (post.cloudPublicId) {
            const oldPublicId = post.cloudPublicId;
            // console.log(oldPublicId, "<-----oldPublicId cloud id------------>");

            // Delete existing image from Cloudinary
            await deleteImage(oldPublicId);
        }

        // Upload new image to Cloudinary
        const cloudImageLink = await uploadImage(postdata.postImage);
        post.onCloudinaryLink = cloudImageLink.secure_url;
        post.cloudPublicId = cloudImageLink.public_id;
    }

    // ----------- delete existing image in local ----------
    if (postdata.postImage && post.postImage) {
        const currentImagePath = path.resolve(__dirname, '../..', post.postImage);
        console.log(currentImagePath, "current path")
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

    // Update post details with the new data
    post.postTitle = postdata.postTitle || post.postTitle;
    post.description = postdata.description || post.description;

    // Save changes to the post
    await post.save();

    return post;
};

// const updatePostService = async (postId, postdata, userData) => {
//     console.log(postdata, "---------- postdata -----------");
//     const post = await postModel.findById(postId);
//     console.log(post, "---------- post -------------")
//     if (!post) {
//         throw HttpException(404, 'This post does not exist');
//     }

//     // if (post.userId.equals(userData._id)) {
//     //     throw HttpException(401, "Unauthorized user can't update post");
//     // }

//     //----------- delete existing image in cloudinary ------------

//     if (postdata.postImage !== post.onCloudinaryLink && postdata.postImage !== undefined && postdata.postImage !== null) {
//         console.log(post.cloudPublicId, "<-----post.cloudPublicId------------>")
//         if (post.cloudPublicId) {
//             const oldPublicId = post.cloudPublicId
//             console.log(oldPublicId, "<-----oldPublicId cloud id------------>")

//             await deleteImage(oldPublicId)
//         }

//         const cloudImageLink = await uploadImage(postdata?.postImage)
//         post.onCloudinaryLink = await cloudImageLink.secure_url
//         post.cloudPublicId = await cloudImageLink.public_id

//         // ----------- delete existing image in local ----------
//         if (postdata.postImage && post.postImage) {
//             const currentImagePath = path.join(__dirname, '../..', post.postImage);
//             if (fs.existsSync(currentImagePath)) {
//                 fs.unlink(currentImagePath, (err) => {
//                     if (err) {
//                         console.error('Failed to delete existing image:', err);
//                     }
//                 });
//             } else {
//                 console.log('File does not exist, cannot delete:', currentImagePath);
//             }
//         }

//     }

//     console.log(postdata, "------- postdata in service ----------")
//     const postDetail = await postModel.findByIdAndUpdate(
//         { _id: postId },
//         { ...postdata },
//         { new: true }
//     );

//     return postDetail;
// };

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