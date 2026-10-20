const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    uri: {
        type : String,
        required : true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpotifyUser',
        required: true
    }
})

const musicModel = mongoose.model('SpotifyMusic', musicSchema);

module.exports = musicModel;