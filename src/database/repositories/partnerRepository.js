const PartnerModel = require('../models/partner')
const PersistenceError = require('../errors/persistenceError')

exports.save = async (partner) => {
    try {
        const createdPartner = await PartnerModel.create(partner)

        return createdPartner
    } catch (error) {
        console.error(error.message)
        throw new PersistenceError()
    }
}

exports.checkPartnerExists = async (partner) => {
    try {
        const response = await PartnerModel.find(
            {
                $or: [{ id: partner.id }, { document: partner.document }]
            }
        )

        return response.length !== 0
    }
    catch (error) {
        console.error(error)
        throw new PersistenceError()
    }

}

exports.findById = async (id) => {
    try {
        const foundPartner = await PartnerModel.findOne({ id })

        return foundPartner
    }
    catch (error) {
        console.error(error)
        throw new PersistenceError()
    }
}

exports.findPartnersWithinCoverageArea = async (latitude, longitude) => {
    try {
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
    catch (error) {
        console.error(error)
        throw new PersistenceError()
    }
}
