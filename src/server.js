const express = require('express')
const routes = require('./routes/partner.routes')
const connectDB = require('../config/databaseConfig')

connectDB()

const app = express()

app.listen(3333, () => {
    console.log(process.env.HELLO)
    console.log('Server is up and running!')
})

app.use(routes)