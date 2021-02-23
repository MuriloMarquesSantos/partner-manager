const {
    addPartner,
    getPartnerById,
    findNearestPartner
} = require('../../core/services/partnerService')

const {
    getValidatedAddPartnerRequest,
    validateFindPartners,
} = require('../validators/partnerValidator')

const PartnerDTO = require('../../core/dto/partnerDTO')
const PartnerResponse = require('../models/partnerResponse')
const FindNearestPartnerRequest = require('../models/findNearestPartnerRequest')

exports.addPartner = async (request, response) => {
    try {
        const createPartnerRequest = getValidatedAddPartnerRequest(request.body)

        const partnerDto = new PartnerDTO(createPartnerRequest)

        const createdPartner = await addPartner(partnerDto)

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

exports.getPartnerById = async (request, response) => {
    try {
        const { id } = request.params
        const foundPartner = await getPartnerById(id)

        const partnerResponse = new PartnerResponse(foundPartner)

        return response.status(200).json(partnerResponse)
    } catch (error) {
        console.error(error)
        return response.status(error.statusCode).json({ message: error.message })
    }
}

exports.findNearestPartner = async (request, response) => {
    try {
        validateFindPartners(request.query)
        const findNearestPartnerRequest = new FindNearestPartnerRequest(request.query)
        const foundPartner = await findNearestPartner(findNearestPartnerRequest)

        const partnerResponse = new PartnerResponse(foundPartner)

        return response.status(200).json(partnerResponse)
    } catch (error) {
        console.error(error)
        return response.status(error.statusCode).json({ message: error.message })
    }
}
