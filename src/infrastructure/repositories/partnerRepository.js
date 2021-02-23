const PartnerModel = require('../models/partner')
const PersistenceError = require('../errors/persistenceError')
const Partner = require('../../core/entities/partner')

class PartnerRepository {
    async save(partner) {
        try {
            const createdPartner = await PartnerModel.create(partner)

            return new Partner(createdPartner)
        } catch (error) {
            console.error(error.message)
            throw new PersistenceError()
        }
    }

    async checkPartnerExists(partner) {
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

    async findById(id) {
        try {
            const foundPartner = await PartnerModel.findOne({ id })
            if (foundPartner) {
                return new Partner(foundPartner)
            }
            return null
        }
        catch (error) {
            console.error(error)
            throw new PersistenceError()
        }
    }

    async findPartnersWithinCoverageArea(latitude, longitude) {
        try {
            const foundPartners = await PartnerModel.find({
                coverageArea: {
                    $geoIntersects: {
                        $geometry:
                            { type: "Point", coordinates: [latitude, longitude] }
                    }
                }
            }).sort({ address: -1 })

            if (foundPartners && foundPartners.length > 0) {
                return foundPartners[0]
            }

            return null
        }
        catch (error) {
            console.error(error)
            throw new PersistenceError()
        }
    }
}

module.exports = PartnerRepository