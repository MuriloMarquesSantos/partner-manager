const express = require('express')
const { addPartner } = require('../services/partnerService')

const router = express.Router()

router.route('/').post(addPartner)

module.exports = router
