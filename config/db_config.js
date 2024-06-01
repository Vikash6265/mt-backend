const mongoose = require('mongoose')

const ConnectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNECTION SUCCESS : ${conn.connection.host}`);
    } catch (error) {
        console.log(`DB CONNECTION FAILED : ${error.message}`);
    }
}

module.exports = ConnectDB;