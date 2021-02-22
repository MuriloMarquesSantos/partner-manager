class PartnerAlreadyExistsError extends Error {
    constructor() {
        super("Partner with this Id or Document, already exists")
        this.statusCode = 409
    }
}

module.exports = PartnerAlreadyExistsError