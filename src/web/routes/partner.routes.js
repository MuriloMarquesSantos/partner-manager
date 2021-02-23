const express = require('express')
const {
    addPartner,
    getPartnerById,
    findPartners
} = require('../controllers/partnerController')

const router = express.Router()

router.route('/').post(addPartner)

router.route('/:id').get(getPartnerById)

router.route('/').get(findPartners)

module.exports = router
