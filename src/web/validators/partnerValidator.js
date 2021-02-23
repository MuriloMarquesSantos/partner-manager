const createPartnerRequest = require('../models/createPartnerRequest')
const ValidationError = require('../errors/validationError')

exports.getValidatedAddPartnerRequest = (partnerRequestBody) => {
    const { error, value } = createPartnerRequest.validate(partnerRequestBody)

    if (error) {
        console.error(error.message)
        throw new ValidationError(error.message)
    }

    return value
}

exports.validateFindPartners = (requestQuery) => {
    const { latitude, longitude } = requestQuery
    if (!latitude || !longitude) {
        throw new ValidationError("Either provide Latitude and Longitude query params, or search a partner by id with /:id")
    }
}
