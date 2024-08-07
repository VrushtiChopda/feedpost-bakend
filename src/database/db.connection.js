const mongoose = require('mongoose')

const databaseConnection = mongoose.connect('mongodb://127.0.0.1:27017/feed-post')
    .then(() => {
        console.log("Database connected")
    }).catch((e) => {
        console.log(e)
    })

module.exports = databaseConnection