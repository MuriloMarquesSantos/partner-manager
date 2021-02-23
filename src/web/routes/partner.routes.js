const express = require('express')
const {
    addPartner,
    getPartnerById,
    findNearestPartner
} = require('../controllers/partnerController')

const router = express.Router()

router.route('/').post(addPartner)

router.route('/:id').get(getPartnerById)

router.route('/').get(findNearestPartner)

module.exports = router
