const express = require('express')
const routes = require('./web/routes/partner.routes')
const connectDB = require('../config/databaseConfig')

const PARTNERS_URI_PREFIX = process.env.PARTNERS_URI_PREFIX
const PORT = process.env.PORT

connectDB()

const app = express()

app.use(express.json())

app.use(`${PARTNERS_URI_PREFIX}`, routes)

app.listen(PORT, () => {
    console.log(`Server is up and running! in port ${PORT}`)
})

