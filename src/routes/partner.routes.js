const express = require('express')
const { addPartner, getPartnerById } = require('../services/partnerService')

const router = express.Router()

router.route('/').post(addPartner)

router.route('/:id').get(getPartnerById)

module.exports = router
