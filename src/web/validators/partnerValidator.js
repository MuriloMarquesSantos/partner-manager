const partnerSchema = require('./partnerSchema')
const ValidationError = require('./errors/validationError')

exports.validateAddPartnerRequest = (partnerRequestBody) => {
    const { error } = partnerSchema.validate(partnerRequestBody)

    if (error) {
        console.error(error.message)
        throw new ValidationError(error.message)
    }
}

exports.validateFindPartners = (requestQuery) => {
    const { latitude, longitude } = requestQuery
    if (!latitude || !longitude) {
        throw new ValidationError("Either provide Latitude and Longitude query params, or search a partner by id with /:id")
    }
}
