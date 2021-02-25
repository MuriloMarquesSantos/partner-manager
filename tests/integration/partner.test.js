const partnerRequest = require('./partnerRequest.json')
const request = require('supertest')
const app = require('../../src/server')
const { connectDB, disconnectDB } = require('../../config/databaseConfig')
const PartnerModel = require('../../src/infrastructure/models/partner')

beforeAll(async () => {
    await connectDB()
})

afterAll(async () => {
    await PartnerModel.deleteOne({ id: "64" })
    await disconnectDB()
})

describe("Partner Integration Tests", () => {
    it("Should create a partner with success", async () => {

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
    })

    it("Should find a partner by id with success", async () => {
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

    })

    it("Should find nearest partner with success", async () => {
        const response = await request(app)
            .get('/api/v1/partners?latitude=-44.01436&longitude=-19.92319')
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

    })

})
