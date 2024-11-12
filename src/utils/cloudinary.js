const cloudinary = require('cloudinary').v2
const path = require('path')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Upload image to 'feed-post' folder
const uploadImage = (filepath) => {
    if (!filepath) {
        return;
    }
    console.log(path.basename(filepath), "----------------filebasename--------------")
    const filename = path.basename(filepath);
    const foldername = 'feed-post'; // Cloudinary folder

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filepath, {
            folder: foldername,  // Using 'folder' to explicitly set the folder
            public_id: filename, // Filename without path
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

// Delete image by publicId
const deleteImage = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { uploadImage, deleteImage };


// const cloudinary = require('cloudinary').v2
// const path = require('path')
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

// const uploadImage = (filepath) => {
//     if (!filepath) {
//         return
//     }
//     console.log("<---------next to clod>")
//     const filename = path.basename(filepath)
//     const foldername = 'feed-post'
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(filepath, { public_id: `${foldername}/${filename}` }, (error, result) => {
//             console.log("<-----------enter promise--------------->")
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(result)
//             }
//             console.log("<-----------exist promise--------------->")
//         })
//     })
// }

// const deleteImage = (publicId) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.destroy(publicId, (error, result) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(result)
//             }
//         })
//     })
// }

// module.exports = { uploadImage, deleteImage }