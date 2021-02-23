class PartnerDTO {
    constructor({id, tradingName, ownerName, document, coverageArea, address}) {
        this.id = id
        this.tradingName = tradingName
        this.ownerName = ownerName
        this.document = document
        this.coverageArea = coverageArea
        this.address = address
    }
}

module.exports = PartnerDTO
