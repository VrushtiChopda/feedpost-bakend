const { createPostService, getPostService, updatePostService, deletePostService } = require('../services/post.services')
const createPost = async (req, res, next) => {
    try {
        const postdata = req.body
        const data = await createPostService(postdata)
        res.status(200).json({ data: data, message: "post added successfully" })
    } catch (error) {
        next(error)
    }
}

const getPost = async (req, res, next) => {
    try {
        const data = await getPostService()
        res.status(200).json({ data: data, message: "all post details" })
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    console.log(req.user, "req.user")
    try {
        const id = req.params.id
        const postdata = req.body
        const userData = req.user
        // console.log(postdata, "---------- post data ---------------")
        console.log(userData, "--------------------------update post--------------------------")
        const data = await updatePostService(id, postdata, userData)
        if (!data || data === undefined || data === null) {
            res.status(409).json({ message: "post not updated" })
        } else {
            res.status(200).json({ data: data, message: 'post updated sucessfully' })
        }
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const postdata = req.body
        const userData = req.user
        console.log(userData, "delete post")
        const data = await deletePostService(id, postdata, userData)
        res.status(200).json({ message: "post deleted successfully" })
    } catch (error) {
        next(error)
    }
}
module.exports = { createPost, getPost, updatePost, deletePost }