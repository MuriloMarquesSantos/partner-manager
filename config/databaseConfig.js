const mongoose = require('mongoose')

const connectDB = async () => {
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

        console.log(`Mongo Database connected in: ${connection.connection.host}`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB
