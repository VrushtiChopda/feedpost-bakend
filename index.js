require('dotenv').config()
const express = require('express')
// const cookieParser = require('cookie-parser')
const databaseConnection = require('./src/database/db.connection')
const userRoute = require('./src/routes/user.route')
const app = express()

app.use(express.json())
app.use('/user', userRoute)
// app.use(cookieParser())
// app.get('/', (req, res) => {
//     res.send("Testing")
// })

databaseConnection.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running on 3000")
    })
})