const AppError = require('../errors/appError')
const PartnerNotFoundError = require('../errors/partnerNotFoundError')
const PartnerAlreadyExistsError = require('../errors/partnerAlreadyExistsError')
const { 
    save,
    checkPartnerExists,
    findById,
    findPartnersWithinCoverageArea
} = require('../../infrastructure/repositories/partnerRepository')

exports.addPartner = async (partnerDTO) => {
    try {
        const partner = new Partner(partnerDTO)
        const partnerExists = await checkPartnerExists(partner)
        if (partnerExists) {
            throw new PartnerAlreadyExistsError()
        }

        const createdPartner = await save(partner)

        return new PartnerDTO(createdPartner)
    } catch (error) {
        console.error(error)
        throw new AppError(error.message, error.statusCode)
    }
}

exports.getPartnerById = async (partnerId) => {
    try {
        const foundPartner = await findById(partnerId)

        if (!foundPartner) {
            throw new PartnerNotFoundError("Partner not found")
        }

        return new PartnerDTO(foundPartner)
    } catch (error) {
        console.error(error)
        throw new AppError(error.message, error.statusCode)
    }
}

exports.findNearestPartner = async (findNearestPartnerRequest) => {
    try {
        const { latitude, longitude } = findNearestPartnerRequest
        const foundPartner = await findPartnersWithinCoverageArea(latitude, longitude)

        if (!foundPartner) {
            throw new PartnerNotFoundError("No partners nearby")
        }

        return new PartnerDTO(foundPartner)

    } catch (error) {
        console.error(error)
        throw new AppError(error.message, error.statusCode)
    }
}
