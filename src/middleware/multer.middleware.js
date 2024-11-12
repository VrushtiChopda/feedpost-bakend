const multer = require('multer');
const path = require('path');

//-------------- for store image locally ----------- 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

//------------- for store image in cloudinary -------------
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

module.exports = { upload }     