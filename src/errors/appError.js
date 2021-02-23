class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.statusCode =  statusCode || 500
    }
}

module.exports = AppError
