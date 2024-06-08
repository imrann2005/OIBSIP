const mongoose = require('mongoose');
require('dotenv').config();

const connectionStr = process.env.MONGO_URI;


const connection = async () => {
    try {
         await mongoose.connect(connectionStr);

        console.log(`Mongo DB connection successful`);
    } catch (error) {
        console.log(error);
    }

}

module.exports = connection;