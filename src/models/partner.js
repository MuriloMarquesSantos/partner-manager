const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Please add a Partner Id'],
        unique: [true, 'Partner Id must be unique'],
        maxLength: [10, 'Partner Id must be less than 10 characters']
    },
    tradingName: String,
    ownerName: String,
    document: {
        type: String,
        unique: [true, 'Document must be unique']
    },
    coverageArea: {
        type: {
            type: String,
            enum: ['MultiPolygon'],
            required: true
          },
          coordinates: {
            type: [[[[Number]]]],
            required: true
          }
    },
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
})

partnerSchema.index({coverageArea: '2dsphere'})

module.exports = mongoose.model('partner', partnerSchema)
