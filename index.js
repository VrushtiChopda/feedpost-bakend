require('dotenv').config()
const express = require('express')
// const cookieParser = require('cookie-parser')
const databaseConnection = require('./src/database/db.connection')
const errorMiddleware = require('./src/middleware/error.middleware')
const userRoute = require('./src/routes/user.route')
const postRoute = require('./src/routes/post.route')
const commentRoute = require('./src/routes/comment.route')
const replyRoute = require('./src/routes/reply.route')
const app = express()

app.use(express.json())
app.use('/user', userRoute, errorMiddleware)
app.use('/post', postRoute, errorMiddleware)
app.use('/comment', commentRoute, errorMiddleware)
app.use('/reply', replyRoute, errorMiddleware)
// app.use(cookieParser())
// app.get('/', (req, res) => {         
//     res.send("Testing")
// })

databaseConnection.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on ${process.env.PORT}`)
    })
})          