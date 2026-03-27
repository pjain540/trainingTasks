const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/rest-api")
        console.log("Mongo DB connected successfully!!")
    } catch (err) {
        console.log("Error in connecting DB", err.message)
    }
}

module.exports = connectDB