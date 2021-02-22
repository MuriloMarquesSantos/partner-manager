class PartnerAlreadyExistsError {
    constructor() {
        this.message = "Partner with this Id or Document, already exists"
        this.statusCode = 409
    }
}

module.exports = PartnerAlreadyExistsError