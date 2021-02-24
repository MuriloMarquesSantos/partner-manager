const express = require('express')
const PartnerController = require('../controllers/partnerController')

const partnerController = new PartnerController()
const router = express.Router()

router.route('/').post(partnerController.addPartner)

router.route('/:id').get(partnerController.getPartnerById)

router.route('/').get(partnerController.findNearestPartner)

module.exports = router
