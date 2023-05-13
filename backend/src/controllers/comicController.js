const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } = process.env;
const Comic = require('../models/comic');
const User = require('../models/users');
const Serie = require('../models/serie');

async function postSerie(req, res) {
  const { title } = req.body.serie;
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const serie = new Serie({
      userId: user._id,
      nameSerie: title
    })
    await serie.save();
    res.status(200).json({ result: 'success', serie_id: serie._id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: 'error', message: error });
  }
}

async function getUserSeries(req, res) {
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    const userSeries = await Serie.find({ "user": userId })
    res.status(200).json(userSeries)
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: 'error', message: error });
  }
}

async function getUserSerie(req, res) {
  const { id } = req.params;
  try {
    const mainSerie = await Serie.findById(id); // Busca el cómic principal por su ID

    return res.status(200).json(mainSerie); // Retorna los cómics relacionados
  } catch (error) {
    console.error(error);
  }
}

async function putComic(req, res) {
  const { serie, _id, imagesPost } = req.body.comicLoaded;
  try {
    const serieFound = await Serie.findById(serie);
    if (!serieFound) {
      return res.status(404).json({ result: 'error', message: "Serie not found" });
    }

    serieFound.frontPage = imagesPost[0];
    serieFound.partsSerie = _id;

    await serieFound.save()
    res.status(200).json({ result: 'success', message: "success updated" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: 'error', message: error });
  }
}

async function postComic(req, res) {
  const { title, description, typeContent, keywords, imagesPost, comicPart } = req.body.postComplete;
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const comic = new Comic({
      user: user._id,
      title: title,
      description: description,
      typeContent: typeContent,
      keywords: keywords,
      imagesPost: imagesPost,
      serie: comicPart
    });

    await comic.save();
    res.status(200).json({ result: 'success', message: "Comic save", comic: comic });
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: 'error', message: error });
  }
}


async function getUserComics(req, res) {
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    const userComics = await Comic.find({ "user": userId })
    res.status(200).json(userComics)
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: 'error', message: error });
  }
}

async function getUserComic(req, res) {
  const { id } = req.params;
  try {
    const mainComic = await Comic.findById(id); // Busca el cómic principal por su ID

    return res.status(200).json(mainComic); // Retorna los cómics relacionados
  } catch (error) {
    console.error(error);
  }
}


async function getAzarComics(req, res) {
  try {
    const response = await Comic.aggregate([{ $sample: { size: 6 } }]);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ result: 'error', message: error });
  }
}

module.exports = {
  postComic,
  getUserComics,
  getUserComic,
  getAzarComics,
  postSerie,
  putComic,
  getUserSeries,
  getUserSerie
}