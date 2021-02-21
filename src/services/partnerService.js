const partner = require('../models/partner')

exports.addPartner = async (request, response, next) => {
    try {
        const createdPartner = await partner.create(request.body)

        return response.status(201).json({
            success: true,
            data: createdPartner
        })
    } catch (error) {
        console.error(error)
        return response.status(500).json(error.message)
    }
}
