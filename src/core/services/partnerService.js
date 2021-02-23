const AppError = require('../errors/appError')
const PartnerNotFoundError = require('../errors/partnerNotFoundError')
const PartnerAlreadyExistsError = require('../errors/partnerAlreadyExistsError')

const Partner = require('../entities/partner')
const PartnerDTO = require('../dto/partnerDTO')

class PartnerService {
    constructor(partnerRepository) {
        this.partnerRepository = partnerRepository
    }
    async addPartner(partnerDTO) {
        try {
            const partner = new Partner(partnerDTO)
            const partnerExists = await this.partnerRepository.checkPartnerExists(partner)
            if (partnerExists) {
                throw new PartnerAlreadyExistsError()
            }

            const createdPartner = await this.partnerRepository.save(partner)

            return new PartnerDTO(createdPartner)
        } catch (error) {
            console.error(error)
            throw new AppError(error.message, error.statusCode)
        }
    }

    async getPartnerById(partnerId) {
        try {
            const foundPartner = await this.partnerRepository.findById(partnerId)

            if (!foundPartner) {
                throw new PartnerNotFoundError("Partner not found")
            }

            return new PartnerDTO(foundPartner)
        } catch (error) {
            console.error(error)
            throw new AppError(error.message, error.statusCode)
        }
    }

    async findNearestPartner(findNearestPartnerRequest) {
        try {
            const { latitude, longitude } = findNearestPartnerRequest
            const foundPartner = await this.partnerRepository.findPartnersWithinCoverageArea(latitude, longitude)

            if (!foundPartner) {
                throw new PartnerNotFoundError("No partners nearby")
            }

            return new PartnerDTO(foundPartner)

        } catch (error) {
            console.error(error)
            throw new AppError(error.message, error.statusCode)
        }
    }
}

module.exports = PartnerService

