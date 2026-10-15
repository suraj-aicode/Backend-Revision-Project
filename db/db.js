const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(
      "mongodb+srv://suraj:2pBASJ8qrfbOsgjI@yt-complete-backend.zyuhnpx.mongodb.net/",
    );
    console.log("MongoDB connected");
}

module.exports = connectDB;