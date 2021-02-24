const PartnerService = require('../../../../src/core/services/partnerService')
const PartnerRepository = require('../../../../src/infrastructure/repositories/partnerRepository')
const PartnerDTO = require('../../../../src/core/dto/partnerDTO')
const AppError = require('../../../../src/core/errors/appError')

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

    it("Should return a valid partner given a valid request id", async () => {
        const partnerStubResponse = createPartnerStub()
        const partnerRepo = new PartnerRepository()
        sinon.stub(partnerRepo, "findById")
            .returns(partnerStubResponse)

        const partnerService = new PartnerService(partnerRepo)

        const foundPartner = await partnerService.getPartnerById("2")

        expect(foundPartner.id).toEqual(partnerStubResponse.id)
    })

    it("Should return a valid partner given a valid request id", async () => {
        const partnerRepo = new PartnerRepository()
        sinon.stub(partnerRepo, "findById")
            .returns(null)

        const partnerService = new PartnerService(partnerRepo)

        await expect(partnerService.getPartnerById("2"))
            .rejects
            .toThrowError(new AppError('Partner not found', 404))
    })

    it("Should return a valid nearest partner given a valid request", async () => {
        const partnerStubResponse = createPartnerStub()
        const partnerRequest = {
            latitude: '27.23423',
            longitude: '50,12323'
        }
        const partnerRepo = new PartnerRepository()
        findPartnerStub = sinon.stub(partnerRepo, "findPartnersWithinCoverageArea")
            .returns(partnerStubResponse)

        const partnerService = new PartnerService(partnerRepo)

        const foundPartner = await partnerService.findNearestPartner(partnerRequest)

        expect(findPartnerStub.calledOnce).toBe(true)
        expect(partnerStubResponse.id).toEqual(foundPartner.id)

    })

    it("Should throw an AppError given there is no partner nearby", async () => {
        const partnerRequest = {
            latitude: '27.23423',
            longitude: '50,12323'
        }
        const partnerRepo = new PartnerRepository()
        findPartnerStub = sinon.stub(partnerRepo, "findPartnersWithinCoverageArea")
            .returns(null)

        const partnerService = new PartnerService(partnerRepo)

        await expect(partnerService.findNearestPartner(partnerRequest))
            .rejects
            .toThrowError(new AppError('No partners nearby', 404))

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