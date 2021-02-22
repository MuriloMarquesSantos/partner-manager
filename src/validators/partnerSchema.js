const Joi = require('joi');

const coverageSchema = Joi.object({
    type: Joi.string()
        .valid('MultiPolygon')
        .required(),
    coordinates: Joi.array()
        .items(Joi.array()
            .items(Joi.array()
                .items(Joi.array().items(Joi.number()))))

})

const addressSchema = Joi.object({
    type: Joi.string()
        .valid('Point')
        .required(),
    coordinates: Joi.array()
        .items(Joi.number())
})

const partnerSchema = Joi.object({
    id: Joi.string()
        .required(),

    tradingName: Joi.string()
        .required(),
    ownerName: Joi.string()
        .required(),
    document: Joi.string()
        .required(),
    coverageArea: coverageSchema,
    address: addressSchema
})

module.exports = partnerSchema
