const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    return response.status(200).json({success: 'true'})
})

module.exports = router