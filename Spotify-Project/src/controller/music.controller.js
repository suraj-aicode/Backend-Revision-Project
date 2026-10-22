const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadMusic } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        if (decoded.role !== "artist") {
            return res
                .status(403)
                .json({ message: "You don t have access to create music" });
        }
  
 
        const { title } = req.body;
        const file = req.file;

        const result = await uploadMusic(file.buffer.toString("base64"));
        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        });
        res.status(201).json({
            message: "Music created Successfully",
            music,
        });
    } catch (error) {
    res.status(500).json({
        message: "Error creating music",
        
    });
  }
}

async function createAlbum(req, res) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access to create album" });
        }

        const { title, musics } = req.body;

        if (!title || !Array.isArray(musics)) {
            return res.status(400).json({
                message: "Album title and musics array are required",
            });
        }

        const album = await albumModel.create({
          title,
          artist: decoded.id,
          musics,
        });

        res.status(201).json({
            message: "Album created Successfully",
            album,
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating album" });
    }
}

module.exports = { createMusic, createAlbum };
