const PartnerService = require('../../../src/core/services/partnerService')
const PartnerRepository = require('../../../src/infrastructure/repositories/partnerRepository')
const PartnerDTO = require('../../../src/core/dto/partnerDTO')
const PartnerAlreadyExistsError = require('../../../src/core/errors/partnerAlreadyExistsError')
const AppError = require('../../../src/core/errors/appError')

const sinon = require('sinon')

describe("Partner Service tests", () => {
    it("Should add a valid partner given a valid input entry and user does not exists", async () => {
        const partnerStubResponse = createPartnerStub()
        const partnerRepo = new PartnerRepository()
        const checkPartnerExistsStub = sinon.stub(partnerRepo, "checkPartnerExists")
            .returns(false)
        const saveStub = sinon.stub(partnerRepo, "save")
            .returns(partnerStubResponse)

        const partnerService = new PartnerService(partnerRepo)
        const partnerDTO = new PartnerDTO(partnerStubResponse)

        const createdPartner = await partnerService.addPartner(partnerDTO)

        expect(saveStub.calledOnce).toBe(true)
        expect(checkPartnerExistsStub.calledOnce).toBe(true)
        expect(createdPartner.id).toEqual(partnerStubResponse.id)
    })

    it("Should throw an AppError given a valid input entry and user already exists", async () => {
        const partnerStubResponse = createPartnerStub()
        const partnerRepo = new PartnerRepository()
        const checkPartnerExistsStub = sinon.stub(partnerRepo, "checkPartnerExists")
            .returns(true)

        const partnerService = new PartnerService(partnerRepo)
        const partnerDTO = new PartnerDTO(partnerStubResponse)

        await expect(partnerService.addPartner(partnerDTO))
            .rejects
            .toThrowError(new AppError('Partner with this Id or Document, already exists', 409))
    })
})

function createPartnerStub() {
    return {
        id: "1",
        tradingName: "tradingName",
        ownerName: "aOwner",
        document: "123123123",
        coverageArea: {},
        address: {}
    }
}