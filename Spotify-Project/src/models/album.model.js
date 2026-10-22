const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SpotifyMusic',
        }],
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpotifyUser',
        required: true,
    }
})

const albumModel = mongoose.model('Album', albumSchema)

module.exports = albumModel