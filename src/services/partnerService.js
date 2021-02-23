const AppError = require('../errors/appError')
const PartnerNotFoundError = require('../errors/partnerNotFoundError')
const PartnerAlreadyExistsError = require('../errors/partnerAlreadyExistsError')
const { 
    save,
    checkPartnerExists,
    findById,
    findPartnersWithinCoverageArea
} = require('../database/repositories/partnerRepository')

exports.addPartner = async (partner) => {
    try {
        const partnerExists = await checkPartnerExists(partner)
        if (partnerExists) {
            throw new PartnerAlreadyExistsError()
        }

        const createdPartner = await save(partner)

        return createdPartner
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

        return foundPartner
    } catch (error) {
        console.error(error)
        throw new AppError(error.message, error.statusCode)
    }
}

exports.findPartners = async (latitude, longitude) => {
    try {
        const foundPartners = await findPartnersWithinCoverageArea(latitude, longitude)

        if (!foundPartners || foundPartners.length === 0) {
            throw new PartnerNotFoundError("No partners nearby")
        }

        return foundPartners
    } catch (error) {
        console.error(error)
        throw new AppError(error.message, error.statusCode)
    }
}
