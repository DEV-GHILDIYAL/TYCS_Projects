const mongoose = require('mongoose')

const connectMongo = async () =>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URL)
            console.log('Database is connected succesfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectMongo;