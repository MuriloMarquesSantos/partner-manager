const mongoose = require('mongoose')

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            auth: {
                authSource: "admin"
            },
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        })

        console.log(`Mongo Database connected: ${connection.connection.host}`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB
