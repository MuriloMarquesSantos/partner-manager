const {
    addPartner,
    getPartnerById,
    findPartners
} = require('../services/partnerService')

const {
    validateAddPartnerRequest,
    validateFindPartners,
} = require('../validators/partnerValidator')

exports.addPartner = async (request, response) => {
    try {
        validateAddPartnerRequest(request.body)

        const createdPartner = await addPartner(request.body)

        return response.status(201).json({
            success: true,
            data: createdPartner
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

        return response.status(200).json(foundPartner)
    } catch (error) {
        console.error(error)
        return response.status(error.statusCode).json({ message: error.message })
    }
}

exports.findPartners = async (request, response) => {
    try {
        validateFindPartners(request.query)
        const { latitude, longitude } = request.query
        const foundPartner = await findPartners(latitude, longitude)

        return response.status(200).json(foundPartner)
    } catch (error) {
        console.error(error)
        return response.status(error.statusCode).json({ message: error.message })
    }
}
