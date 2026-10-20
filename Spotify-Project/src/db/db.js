const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
    });
    } catch (error) {
        console.error(error);
        console.error('Failed to connect to MongoDB', error);
    }
}

module.exports = connectDB;