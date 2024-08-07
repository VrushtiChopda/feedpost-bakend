const express = require('express')
const databaseConnection = require('./src/database/db.connection')
const router = require('./src/routes/user.route')
const app = express()

app.use(express.json())
app.use('/user', router)

// app.get('/', (req, res) => {
//     res.send("Testing")
// })

databaseConnection.then(() => {
    app.listen(3000, () => {
        console.log("server is running on 3000")
    })
})