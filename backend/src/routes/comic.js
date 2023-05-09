const express = require('express');
const router = express.Router();
const comicController = require('../controllers/comicController')
const authMiddleware = require('../middleware/auth').verifyToken;

router.post('/postcomic', authMiddleware, comicController.postComic);
router.get('/usercomics', authMiddleware, comicController.getUserComics);
router.get('/usercomic/:id', authMiddleware, comicController.getUserComic);
router.post('/postserie', authMiddleware, comicController.postSerie);
router.put('/putcomic', authMiddleware, comicController.putComic);

router.get('/azarcomics', comicController.getAzarComics);
module.exports = router;