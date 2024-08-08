require("dotenv").config()
const mongoose = require('mongoose')

const databaseConnection = mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected")
    }).catch((e) => {
        console.log(e)
    })

module.exports = databaseConnection