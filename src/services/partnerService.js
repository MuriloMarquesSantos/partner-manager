const PartnerModel = require('../models/partner')
const AppError = require('../errors/appError')
const PartnerNotFoundError = require('../errors/partnerNotFoundError')
const PartnerAlreadyExistsError = require('../errors/partnerAlreadyExistsError')

exports.addPartner = async (partner) => {
    try {
        const partnerExists  = await checkPartnerExists(partner)
        if (partnerExists) {
            throw new PartnerAlreadyExistsError()
        }
        
        const createdPartner = await PartnerModel.create(partner)

        return createdPartner
    } catch (error) {
        console.error(error)
        throw new AppError(error.message, error.statusCode)
    }
}

async function checkPartnerExists(partner) {
    const response = await PartnerModel.find(
        {
            $or: [{ id: partner.id }, { document: partner.document }]
        }
    )

    return response.length !== 0
}

exports.getPartnerById = async (partnerId) => {
    try {
        const foundPartner = await PartnerModel.findOne({ id: partnerId })

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

async function findPartnersWithinCoverageArea(latitude, longitude) {
    const foundPartners = await PartnerModel.find({
        coverageArea: {
            $geoIntersects: {
                $geometry:
                    { type: "Point", coordinates: [latitude, longitude] }
            }
        }
    }).sort({ address: -1 })

    return foundPartners
}
