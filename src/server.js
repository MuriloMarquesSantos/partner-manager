const express = require('express')
const routes = require('./web/routes/partner.routes')

const PARTNERS_URI_PREFIX = process.env.PARTNERS_URI_PREFIX

const app = express()

app.use(express.json())

app.use(`${PARTNERS_URI_PREFIX}`, routes)

module.exports = app
