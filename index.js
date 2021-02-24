const app = require('./src/server')
const connectDB = require('./config/databaseConfig')

connectDB()

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`Server is up and running! in port ${PORT}`)
})
