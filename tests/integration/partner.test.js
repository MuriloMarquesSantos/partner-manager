const sinon = require('sinon')
const partnerRequest = require('./partnerRequest.json')
const request = require('supertest')
const app = require('../../src/server')
const PartnerModel = require('../../src/infrastructure/models/partner')

afterEach(() => {
    sinon.restore()
})

describe("Partner Integration Tests", () => {
    it("Should create a partner with success", async (done) => {
        sinon.stub(PartnerModel, "create").returns(partnerRequest)
        sinon.stub(PartnerModel, "find").returns([])
        const response = await request(app)
            .post('/api/v1/partners')
            .set('Accept', 'application/json')
            .send(partnerRequest)
            .expect(201)

        const { id, tradingName, ownerName, document, coverageArea, address } = response.body.data

        expect(id).toBe("64")
        expect(tradingName).toBe("Adega do Joao")
        expect(tradingName).toBe("Adega do Joao")
        expect(ownerName).toBe("Pele Maradona")
        expect(document).toBe("960361.506-47")
        expect(coverageArea).not.toBe(undefined)
        expect(address).not.toBe(undefined)

        done()
    })

    it("Should find a partner by id with success", async (done) => {
        sinon.stub(PartnerModel, "findOne").returns(partnerRequest)
        const response = await request(app)
            .get('/api/v1/partners/64')
            .set('Accept', 'application/json')
            .expect(200)

        const { id, tradingName, ownerName, document, coverageArea, address } = response.body

        expect(id).toBe("64")
        expect(tradingName).toBe("Adega do Joao")
        expect(tradingName).toBe("Adega do Joao")
        expect(ownerName).toBe("Pele Maradona")
        expect(document).toBe("960361.506-47")
        expect(coverageArea).not.toBe(undefined)
        expect(address).not.toBe(undefined)

        done()
    })

    it("Should find nearest partner with success", async (done) => {
        const mockFindOne = {
            sort: function () {
                return [partnerRequest]
            },
        }
        sinon.stub(PartnerModel, "find").returns(mockFindOne)
        const response = await request(app)
            .get('/api/v1/partners?latitude=23.12323&longitude=23.12323')
            .set('Accept', 'application/json')
            .expect(200)

        const { id, tradingName, ownerName, document, coverageArea, address } = response.body

        expect(id).toBe("64")
        expect(tradingName).toBe("Adega do Joao")
        expect(tradingName).toBe("Adega do Joao")
        expect(ownerName).toBe("Pele Maradona")
        expect(document).toBe("960361.506-47")
        expect(coverageArea).not.toBe(undefined)
        expect(address).not.toBe(undefined)

        done()
    })
})
