class PartnerNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 404
    }
}

module.exports = PartnerNotFoundError