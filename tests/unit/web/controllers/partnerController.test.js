const PartnerController = require('../../../../src/web/controllers/partnerController')
const PartnerRepository = require('../../../../src/infrastructure/repositories/partnerRepository')
const PartnerService = require('../../../../src/core/services/partnerService')

const sinon = require('sinon')

describe('Partner controller tests', () => {
    it('It should throw an Error given a create partner request with address missing', async () => {
        const partnerStubRequest = createPartnerStub()
        delete partnerStubRequest.body.address

        let responseStatus;
        let responseMessage;

        responseStructureStub = {
            send: function () { },
            json: function (error) {
                responseMessage = error
                return error
            },
            status: function (responseCode) {
                responseStatus = responseCode
                return this
            },
        }

        const serviceStub = new PartnerService(new PartnerRepository())
        sinon.stub(serviceStub, "addPartner")
            .returns(partnerStubRequest)

        const partnerController = new PartnerController(serviceStub)

        partnerController.addPartner(partnerStubRequest, responseStructureStub)

        expect(responseStatus).toEqual(400)
        expect(responseMessage).toEqual({"message": "\"address\" is required"})
        

    })

    it('It should throw an Error given a create partner request with invalid coverage type', async () => {
        const invalidPartnerStubRequest = createPartnerStub('Polygon')

        let responseStatus;
        let responseMessage;

        responseStructureStub = {
            send: function () { },
            json: function (error) {
                responseMessage = error
                return error
            },
            status: function (responseCode) {
                responseStatus = responseCode
                return this
            },
        }

        const serviceStub = new PartnerService(new PartnerRepository())
        sinon.stub(serviceStub, "addPartner")
            .returns(invalidPartnerStubRequest)

        const partnerController = new PartnerController(serviceStub)

        partnerController.addPartner(invalidPartnerStubRequest, responseStructureStub)

        expect(responseMessage).toEqual({"message": "\"coverageArea.type\" must be [MultiPolygon]"})

        expect(responseStatus).toEqual(400)

    })
})

function createPartnerStub(areaType = "MultiPolygon") {
    return {
        body: {
            id: "1",
            tradingName: "tradingName",
            ownerName: "aOwner",
            document: "123123123",
            coverageArea: {
                type: areaType,
                coordinates: [[[[1,2]]]]
            },
            address: {
                type: "Point",
                coordinates: [1,2]
            }
        }
    }
}