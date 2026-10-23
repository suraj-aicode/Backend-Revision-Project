const express = require('express');
const musicController = require('../controller/music.controller');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });



router.post('/upload',authMiddleware.authArtist,upload.single('music'), musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/", authMiddleware.authUser, musicController.getAllMusic);
router.get("/album", authMiddleware.authArtist, musicController.getAllAlbums);
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumsById);


module.exports = router;