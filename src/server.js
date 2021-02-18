const express = require('express')
const routes = require('./routes/partner.routes')

const app = express()

app.listen(3333, () => {
    console.log('Server is up and running!')
})

app.use(routes)
