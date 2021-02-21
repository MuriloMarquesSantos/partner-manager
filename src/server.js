const express = require('express')
const routes = require('./routes/partner.routes')
const connectDB = require('../config/databaseConfig')

const PARTNERS_URI_PREFIX = process.env.PARTNERS_URI_PREFIX

connectDB()

const app = express()

app.use(express.json())

app.use(`${PARTNERS_URI_PREFIX}`, routes)

app.listen(3333, () => {
    console.log('Server is up and running!')
})

app.use(routes)
