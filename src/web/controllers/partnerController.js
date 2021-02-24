const PartnerService = require('../../core/services/partnerService')

const {
    getValidatedAddPartnerRequest,
    validateFindPartners,
} = require('../validators/partnerValidator')

const PartnerDTO = require('../../core/dto/partnerDTO')
const PartnerResponse = require('../models/partnerResponse')
const FindNearestPartnerRequest = require('../models/findNearestPartnerRequest')
const PartnerRepository = require('../../infrastructure/repositories/partnerRepository')

class PartnerController {
    constructor(partnerService = new PartnerService(new PartnerRepository)) {
        this.partnerService = partnerService
    }
    
    addPartner = async (request, response) => {
        try {
            const createPartnerRequest = getValidatedAddPartnerRequest(request.body)
            const partnerService = new PartnerService(new PartnerRepository())

            const partnerDto = new PartnerDTO(createPartnerRequest)

            const createdPartner = await partnerService.addPartner(partnerDto)

            const partnerResponse = new PartnerResponse(createdPartner)

            return response.status(201).json({
                success: true,
                data: partnerResponse
            })
        } catch (error) {
            console.error(error)
            return response.status(error.statusCode).json({ message: error.message })
        }
    }

    getPartnerById = async (request, response) => {
        try {
            const partnerService = new PartnerService(new PartnerRepository())
            const { id } = request.params
            const foundPartner = await partnerService.getPartnerById(id)

            const partnerResponse = new PartnerResponse(foundPartner)

            return response.status(200).json(partnerResponse)
        } catch (error) {
            console.error(error)
            return response.status(error.statusCode).json({ message: error.message })
        }
    }

    findNearestPartner = async (request, response) => {
        try {
            validateFindPartners(request.query)
            const findNearestPartnerRequest = new FindNearestPartnerRequest(request.query)
            const partnerService = new PartnerService(new PartnerRepository())
            const foundPartner = await partnerService.findNearestPartner(findNearestPartnerRequest)

            const partnerResponse = new PartnerResponse(foundPartner)

            return response.status(200).json(partnerResponse)
        } catch (error) {
            console.error(error)
            return response.status(error.statusCode).json({ message: error.message })
        }
    }
}

module.exports = PartnerController
