class PersistenceError extends Error {
    constructor() {
        super()
        this.message = `Internal Error while executing database operation`
    }
}

module.exports = PersistenceError
