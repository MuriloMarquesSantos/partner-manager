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

exports.getPartnerById = async (request, response) => {
    try {
        const { id } = request.params
        const foundPartner = await partner.findOne({ id })

        console.log(foundPartner)

        if (!foundPartner) {
            return response.status(404).json({ message: "Partner not found" })
        }

        return response.status(200).json(foundPartner)
    } catch (error) {
        console.error(error)
    }
}
