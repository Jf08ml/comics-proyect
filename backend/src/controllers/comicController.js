const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } = process.env;
const Comic = require('../models/comic');
const User = require('../models/users');

async function postComic(req, res) {
  const { title, description, typeContent, keywords, imagesPost } = req.body.postComplete;
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
    });

    await comic.save();
    res.status(200).json({ result: 'success', message: "Comic save" });
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
  getAzarComics
}