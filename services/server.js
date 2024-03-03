// db.js
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to the database');
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }
};

module.exports = connectDB;


