const express = require('express')

const router = express.Router()

const PARTNERS_URI_PREFIX = process.env.PARTNERS_URI_PREFIX

router.get(`${PARTNERS_URI_PREFIX}`, (request, response) => {
    return response.status(200).json({success: 'true'})
})

module.exports = router
