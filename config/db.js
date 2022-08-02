const mongoose = require("mongoose")

const connectDb =async() => {
    try {
        console.log(process.env.MONGO_URI)
        const connect = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
        console.log(`server has connected to ${connect.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb;