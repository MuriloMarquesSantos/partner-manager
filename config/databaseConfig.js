const mongoose = require('mongoose')

exports.connectDB = async () => {
    const mongoUri = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URI: process.env.MONGO_URI_TEST
    try {
        const connection = await mongoose.connect(mongoUri, {
            auth: {
                authSource: "admin"
            },
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        })

        console.log(`Mongo Database connected in: ${connection.connection.host}`)
    } catch (error) {
        console.error(error)
    }
}

exports.disconnectDB = async () => {
    await mongoose.disconnect()
}
