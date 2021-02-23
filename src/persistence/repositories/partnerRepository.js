const PartnerModel = require('../models/partner')
const PersistenceError = require('../errors/persistenceError')
const Partner = require('../../core/entities/partner')

exports.save = async (partner) => {
    try {
        const createdPartner = await PartnerModel.create(partner)

        return new Partner(createdPartner)
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

        return new Partner(foundPartner)
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

        return foundPartners.map(foundPartner => new Partner(foundPartner))
    }
    catch (error) {
        console.error(error)
        throw new PersistenceError()
    }
}
