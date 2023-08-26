const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");
const authMiddleware = require("../middleware/auth").verifyToken;

router.post("/postcomic", authMiddleware, comicController.postComic);
router.get("/usercomics", authMiddleware, comicController.getUserComics);
router.get("/usercomic/:id", comicController.getUserComic);
router.get("/userseries", authMiddleware, comicController.getUserSeries);
router.get("/userserie/:id", comicController.getUserSerie);
router.post("/postserie", authMiddleware, comicController.postSerie);
router.put("/putcomic", authMiddleware, comicController.putComic);
router.get("/azarcomics", comicController.getAzarComics);
router.post("/rateComic", authMiddleware, comicController.postRateComic);
router.put("/assignScore", comicController.assignScore);
router.put("/assignScoreSerie", comicController.assignScoreSerie);
router.put("/sumView", comicController.countViews);
router.put("/sumViewSerie", comicController.countViewsSerie);
router.get("/mostViewsAnimated", comicController.getAnimatedSeriesMostViews);
router.get("/mostViewsReal", comicController.getRealSeriesMostViews);
router.get("/newerSeries/:type", comicController.getNewerSeries);
router.get("/popularSeries/:type", comicController.getPopularSeries);
router.get("/featureArtist/:type", comicController.getFeaturedArtists);
router.get("/artistSeries/:artist", comicController.getArtistSeries);
router.get("/searchSeries/:nameSerie", comicController.searchSerie);
router.get("/seriestoinscribe", authMiddleware, comicController.getSeriesToInscribe);
router.put("/enteredseries/:serie", authMiddleware, comicController.enteredSeries);
module.exports = router;
