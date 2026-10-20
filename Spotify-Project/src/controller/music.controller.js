const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadMusic } = require("../services/storage.service");


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

module.exports = { createMusic };
