const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadMusic } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadMusic(file.buffer.toString("base64"));
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });
  res.status(201).json({
    message: "Music created Successfully",
    music,
  });
}

async function createAlbum(req, res) {

    const { title, musics } = req.body;

    if (!title || !Array.isArray(musics)) {
      return res.status(400).json({
        message: "Album title and musics array are required",
      });
    }

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics,
    });

    res.status(201).json({
      message: "Album created Successfully",
      album,
    });
  
}

async function getAllMusic(req, res) {
    const musics = await musicModel.find().populate("artist","username email");
    res.status(200).json({
        message: "All music fetched successfully",
        musics,
    });
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find()
        .select("title artist")
        .limit(10)
        .populate("artist", "username email")
    res.status(200).json({
        message: "All albums fetched successfully",
        albums,
    });
}

async function getAlbumsById(req, res) {
  const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId)
        .populate("musics", "title uri")
        .populate("artist", "username email");
  if (!album) {
    return res.status(404).json({
      message: "Album not found",
    });
  }
  res.status(200).json({
    message: "Album fetched successfully",
    album,
  });
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumsById };
